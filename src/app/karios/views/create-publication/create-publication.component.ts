import { Component } from '@angular/core';
import { PublicationService } from '../../services/publication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-publication',
  templateUrl: './create-publication.component.html',
  styleUrls: ['./create-publication.component.scss']
})
export class CreatePublicationComponent {

  imagePreview: string | ArrayBuffer | null = null;
  file!: File;

  publicationForm: FormGroup = this.fb.group({
    description: this.fb.control('', [ Validators.maxLength(130) ]),
    file: this.fb.control(null),
  });

  constructor(private publicationService: PublicationService, private fb: FormBuilder,
              private router: Router){

  }

  previewImage(event: any): void {
    const file: File = event.target.files[0];
    this.file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.imagePreview = e.target?.result || null;
      };
      reader.readAsDataURL(file);
    }
  }

  createPublication(){

    this.publicationForm.get('file')?.setValue(this.file);
    const { userId } = JSON.parse(localStorage.getItem('user') || ''); 

    const publication = { 
      description: this.publicationForm.get('description')?.value,
      userId,
      publicationDate: new Date()
    };

    this.publicationService.uploadImage(this.publicationForm.get('file')?.value)
    .pipe(
      switchMap((resp: any) => 
        this.publicationService.createPublication({ ...publication, imageUrl: resp.url })
      )
    )
    .subscribe((resp) => {
        this.publicationForm.reset();
        this.router.navigate(['/karios/home']);
    })
  }

  cancel(): void {
    this.publicationForm.reset();
    this.imagePreview = null;
  }
}
