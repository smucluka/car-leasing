import { MessageService } from './../../../_services/message.service';
import { MarkaService } from './../../../_services/marka.service';
import { Marka } from './../../../_models/marka';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-marka-list-admin',
  templateUrl: './marka.list.component.html'
})
export class MarkaListComponent implements OnInit {
  markaList: Marka[] = [];
  selectedForDelete: Marka = new Marka();
  message: string;
  showDialog = false;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private router: Router,
    private markaService: MarkaService,
    public messageService: MessageService
  ) { }

  ngOnInit() {
    this.message = this.messageService.message;
    // TODO: auto expire
    this.messageService.message = '';

    this.markaService.getAll().pipe(first()).subscribe(markaList => {
        this.markaList = markaList;
    });
  }

  public createMarka(): void {
    this.router.navigateByUrl('admin/manufacturer/new');
  }

  public editMarka(id: number): void {
    this.router.navigateByUrl('admin/manufacturer/' + id + '/edit');
  }

  public selectForDelete(marka: Marka): void {
    this.selectedForDelete = marka;
    this.showDialog = true;
  }

  public deleteMarka(id: number): void {
    this.markaService.delete(id).subscribe(({message}) => {
      this.message = message;
      if (message.includes('Success')) {
        this.markaList.splice(this.markaList.indexOf(this.selectedForDelete), 1);
      }
      this.showDialog = false;
    });
  }
  
}
