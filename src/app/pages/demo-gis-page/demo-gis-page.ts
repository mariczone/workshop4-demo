import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import CSVLayer from "@arcgis/core/layers/CSVLayer.js";
import HeatmapRenderer from "@arcgis/core/renderers/HeatmapRenderer.js";

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import '@arcgis/map-components/components/arcgis-zoom';

@Component({
  selector: 'app-demo-gis-page',
  imports: [CommonModule, AccordionModule, ButtonModule],
  templateUrl: './demo-gis-page.html',
  styleUrl: './demo-gis-page.css'
})
export class DemoGisPage implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('mapViewNode', { static: false }) private mapViewEl!: ElementRef;
  map: Map | null = null;
  mapView: MapView | null = null;
  demoGraphicsLayer = new GraphicsLayer();
  demoVectorTileLayer = new VectorTileLayer({
    url: "https://tiles.arcgis.com/tiles/jSaRWj2TDlcN1zOC/arcgis/rest/services/Thailand_Transportation/VectorTileServer"
  });
  demoFeatureLayer = new FeatureLayer({
    url: "https://services-ap1.arcgis.com/iA7fZQOnjY9D67Zx/ArcGIS/rest/services/OSM_AS_POIs/FeatureServer/0",
    outFields: ["*"],
    popupTemplate: {
      title: "{name}",
      content:
        "<b>Type:</b> {amenity} <br><b>Place:</b> {place} <br>",
    }
  });
  provinceFeatureLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/jSaRWj2TDlcN1zOC/ArcGIS/rest/services/Thailand_Province_Boundaries_view/FeatureServer/1",
    outFields: ["*"]
  });

  demoCSVLayer = new CSVLayer({
    url: "https://raw.githubusercontent.com/jeffprosise/Machine-Learning/refs/heads/master/Data/taxi-fares.csv",
    latitudeField: "pickup_latitude",
    longitudeField: "pickup_longitude",
    popupTemplate: {
      title: "Taxi Ride",
      content: `
      <b>Fare:</b> {fare_amount} USD<br/>
      <b>Passengers:</b> {passenger_count}<br/>
      <b>Pickup:</b> {pickup_datetime}
    `
    }
  });
  defaultRender: any = null;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  async initializeMap(): Promise<any> {
    const container = this.mapViewEl.nativeElement;

    this.map = new Map({
      basemap: 'streets-vector',
    });

    this.mapView = new MapView({
      container,
      map: this.map,
      center: [100.5433989, 13.7029924], // longitude, latitude
      zoom: 20,
    });

    this.map.add(this.demoGraphicsLayer);

    this.mapView.when(() => { });

    return this.mapView.when();
  }

  zoomFeatureLayer() {
    if (!this.map) return;
    this.provinceFeatureLayer.queryFeatures({
      where: "NAME1='กรุงเทพมหานคร'",  // SQL Statement
      returnGeometry: true,
      outFields: ["*"],
      num: 1
    }).then(result => {
      console.log('result', result)
      if (result.features.length > 0) {
        const feature = result.features[0];
        this.demoGraphicsLayer.removeAll();

        // 🔹 สร้าง symbol สำหรับขอบเขตจังหวัด
        const boundarySymbol: any = {
          type: "simple-fill",
          color: [0, 0, 0, 0], // โปร่งใส
          outline: {
            color: [0, 150, 255], // ฟ้า
            width: 3
          }
        };

        // 🔹 สร้าง graphic
        const boundaryGraphic = new Graphic({
          geometry: feature.geometry,
          symbol: boundarySymbol
        });

        // 🔹 วาดขอบเขตจังหวัดลง graphic layer
        this.demoGraphicsLayer.add(boundaryGraphic);

        // 🔹 zoom ไปที่ polygon
        this.mapView?.goTo(
          {
            target: feature.geometry,
            padding: 40
          },
          {
            duration: 1200,
            easing: "ease-in-out"
          }
        );
      }
    });
  }

  hideCSVLayer() {
    if (!this.map) return;

    if (this.map.layers.includes(this.demoCSVLayer)) {
      this.demoCSVLayer.visible = false;
    }
  }

  clearAnalysis() {
    this.demoCSVLayer.renderer = this.defaultRender;
  }

  analysis() {
    if (!this.defaultRender) this.defaultRender = this.demoCSVLayer.renderer;
    this.demoCSVLayer.renderer = new HeatmapRenderer({
      radius: 10,
      field: "fare_amount",
      colorStops: [
        { ratio: 0, color: "rgba(255, 255, 255, 0)" },
        { ratio: 0.2, color: "rgba(255, 255, 153, 0.6)" },
        { ratio: 0.4, color: "rgba(255, 204, 102, 0.7)" },
        { ratio: 0.6, color: "rgba(255, 153, 51, 0.8)" },
        { ratio: 0.8, color: "rgba(255, 102, 102, 0.9)" },
        { ratio: 1, color: "rgba(204, 0, 0, 1)" }
      ],
      minDensity: 0,
      maxDensity: 1
    })
  }

  addCSVLayer() {
    if (!this.map) return;

    if (!this.map.layers.includes(this.demoCSVLayer)) {
      this.map.add(this.demoCSVLayer);
      this.demoCSVLayer.when(() => {
        this.demoCSVLayer.queryExtent().then((response) => {
          if (response.extent) {
            this.mapView!.goTo(
              {
                target: response.extent,
                padding: 50
              },
              {
                duration: 1200,
                easing: "ease-in-out"
              }
            );
          }
        });
      });
    } else {
      this.demoCSVLayer.visible = true;
    }
  }

  addFeatureLayer() {
    if (!this.map) return;

    if (!this.map.layers.includes(this.demoFeatureLayer)) {
      this.map.add(this.demoFeatureLayer);
    } else {
      this.demoFeatureLayer.visible = true;
    }
  }

  hideFeatureLayer() {
    if (!this.map) return;

    if (this.map.layers.includes(this.demoFeatureLayer)) {
      this.demoFeatureLayer.visible = false;
    }
  }

  addVectorTile() {
    if (!this.map) return;

    if (!this.map.layers.includes(this.demoVectorTileLayer)) {
      this.map.add(this.demoVectorTileLayer);
    } else {
      this.demoVectorTileLayer.visible = true;
    }
  }

  hideVectorTile() {
    if (!this.map) return;

    if (this.map.layers.includes(this.demoVectorTileLayer)) {
      this.demoVectorTileLayer.visible = false;
    }
  }

  addGraphics() {
    // zoom to specific location
    this.mapView?.goTo({
      center: [100.5242847, 13.7321502],
      zoom: 13
    })
    // clear all old graphics
    this.demoGraphicsLayer.removeAll();

    // Demo Add Point Graphic to GraphicLayer
    const point: any = {
      //Create a point
      type: "point",
      longitude: -118.80657463861,
      latitude: 34.0005930608889,
    };
    const simpleMarkerSymbol: any = {
      type: "simple-marker",
      color: [226, 119, 40], // Orange
      outline: {
        color: [255, 255, 255], // White
        width: 1,
      },
    };

    const pointGraphic = new Graphic({ geometry: point, symbol: simpleMarkerSymbol });
    this.demoGraphicsLayer.add(pointGraphic);

    // ---------------------------------------------------------------------------
    // Demo Add Polyline Graphic to GraphicLayer
    const polyline: any = {
      type: "polyline",
      paths: [
        [-118.821527826096, 34.0139576938577], //Longitude, latitude
        [-118.814893761649, 34.0080602407843], //Longitude, latitude
        [-118.808878330345, 34.0016642996246], //Longitude, latitude
      ],
    };
    const simpleLineSymbol: any = {
      type: "simple-line",
      color: [226, 119, 40], // Orange
      width: 2,
    };

    const polylineGraphic = new Graphic({ geometry: polyline, symbol: simpleLineSymbol });
    this.demoGraphicsLayer.add(polylineGraphic);

    // ----------------------------------------------------------------------
    // Demo Add Polygon Graphic to GraphicLayer
    const polygon: any = {
      type: "polygon",
      rings: [
        [-118.818984489994, 34.0137559967283], //Longitude, latitude
        [-118.806796597377, 34.0215816298725], //Longitude, latitude
        [-118.791432890735, 34.0163883241613], //Longitude, latitude
        [-118.79596686535, 34.008564864635], //Longitude, latitude
        [-118.808558110679, 34.0035027131376], //Longitude, latitude
      ],
    };

    const simpleFillSymbol: any = {
      type: "simple-fill",
      color: [227, 139, 79, 0.8], // Orange, opacity 80%
      outline: { color: [255, 255, 255], width: 1 },
    };

    const attributes = { Name: "Graphic", Description: "I am a polygon" };
    const popupTemplate = { title: "{Name}", content: "{Description}" };

    const polygonGraphic = new Graphic({
      geometry: polygon,
      symbol: simpleFillSymbol,
      attributes: attributes,
      popupTemplate: popupTemplate,
    });
    this.demoGraphicsLayer.add(polygonGraphic);
  }

  clearGraphicLayer() {
    this.demoGraphicsLayer.removeAll();
  }

  ngOnDestroy(): void {
    if (this.mapView) {
      this.mapView.destroy();
    }
  }
}
