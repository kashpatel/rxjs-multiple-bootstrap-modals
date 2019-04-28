import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval, concat, from, empty, of  } from 'rxjs';
import { take, switchMap, mergeMap, concatMap, tap, map, concatAll, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Hello, {{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close(true)">Yes</button>
       <button type="button" class="btn btn-outline-dark" (click)="activeModal.close(false)">No</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal-component.html'
})
export class NgbdModalComponent {
  
  obs$: any;

  constructor(private modalService: NgbModal) {
      this.obs$ = 
      concat(
        from([1, 2, 3]).pipe(
          tap(selection => console.log("source emitted ", selection)),
          concatMap(() => from(this.modalService.open(NgbdModalContent).result) ),
          tap(selection => console.log("user selected ", selection)),
        )
      ).pipe(
        takeWhile(selection => selection)
      );
  }

  open() {
    this.obs$.subscribe();
  }  
}
