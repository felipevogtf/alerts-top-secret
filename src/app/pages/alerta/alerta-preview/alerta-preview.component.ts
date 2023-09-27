import { Component, Input, OnInit } from '@angular/core';
import { Alerta } from 'src/app/models/alerta/alerta.model';
import Viewer from 'viewerjs';

@Component({
  selector: 'alerta-preview',
  templateUrl: './alerta-preview.component.html',
  styleUrls: ['./alerta-preview.component.scss'],
})
export class AlertaPreviewComponent implements OnInit {
  @Input() alerta: Alerta | null = null;
  private viewer: Viewer | null = null;

  constructor() {}

  ngOnInit() {}

  openImage(imageElement: HTMLElement) {
    if (!this.viewer) {
      this.viewer = new Viewer(imageElement, {
        title: [4, (image: { alt: any; }, imageData: { naturalWidth: any; naturalHeight: any; }) => `${image.alt} (${imageData.naturalWidth} × ${imageData.naturalHeight})`],
        navbar: 0,
        toolbar: {
          zoomIn: {
            show: 4,
            size: 'large',
          },
          zoomOut: {
            show: 4,
            size: 'large',
          },
          oneToOne: 0,
          reset: {
            show: 4,
            size: 'large',
          },
          prev: 0,
          play: 0,
          next: 0,
          rotateLeft: {
            show: 4,
            size: 'large',
          },
          rotateRight: {
            show: 4,
            size: 'large',
          },
          flipHorizontal: {
            show: 4,
            size: 'large',
          },
          flipVertical: {
            show: 4,
            size: 'large',
          },
        },
        zoomOnTouch: true,
        zoomOnWheel: true
      });
      this.viewer.show();
    } else {
      this.viewer.show();
    }
  }
}
