import { Component, OnInit, Input, ViewChild } from '@angular/core';

declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('map') map;

  constructor() { }

  ngOnInit() {

    const [lat, lng] = this.coords.split(',').map( c => Number(c));
    
    mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
      const map = new mapboxgl.Map({
        container: this.map.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 15
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map);
  }

}
