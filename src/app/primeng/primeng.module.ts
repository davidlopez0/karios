import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from "primeng/image";


@NgModule({
  exports: [
    CardModule,
    ButtonModule,
    AvatarModule,
    GalleriaModule,
    ImageModule,
  ]
})
export class PrimengModule { }
