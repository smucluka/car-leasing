import { DodatnaOprema } from './../../../_models/dodatna.oprema';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { DodatnaOpremaService } from 'src/app/_services/dodatna.oprema.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-dodatna-oprema-list-admin',
  templateUrl: './dodatna.oprema.list.component.html'
})
export class DodatnaOpremaListComponent implements OnInit {
  dodatnaOpremaList: DodatnaOprema[] = [];
  selectedForDelete: DodatnaOprema = new DodatnaOprema();
  message: string;
  showDialog = false;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private router: Router,
    private dodatnaOpremaService: DodatnaOpremaService,
    public messageService: MessageService
  ) { }

  ngOnInit() {
    this.message = this.messageService.message;
    // TODO: auto expire
    this.messageService.message = '';

    this.dodatnaOpremaService.getAll().pipe(first()).subscribe(dodatnaOpremaList => {
        this.dodatnaOpremaList = dodatnaOpremaList;
    });
  }

  public createDodatnaOprema(): void {
    this.router.navigateByUrl('admin/equipment/new');
  }

  public editDodatnaOprema(id: number) {
    this.router.navigateByUrl('admin/equipment/' + id + '/edit');
  }

  public selectForDelete(dodatnaOprema: DodatnaOprema): void {
    this.selectedForDelete = dodatnaOprema;
    this.showDialog = true;
  }

  public deleteDodatnaOprema(id: number): void {
    this.dodatnaOpremaService.delete(id).subscribe(({message}) => {
      this.message = message;
      if (message.includes('Success')) {
        this.dodatnaOpremaList.splice(this.dodatnaOpremaList.indexOf(this.selectedForDelete), 1);
      }
      this.showDialog = false;
    });
  }

}
