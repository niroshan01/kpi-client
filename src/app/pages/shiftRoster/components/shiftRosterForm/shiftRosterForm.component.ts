import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ShiftRosterService } from '../../shiftRoster.service';

@Component({
    selector: 'shift-roster-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./shiftRosterForm.scss'],
    templateUrl: './shiftRosterForm.html',
})
export class ShiftRosterForm {

    JSON: any = JSON;

    public formGroup: FormGroup;
    shiftRoster: any = {};
    subscription: Subscription;
    shiftRosterType: any;

    constructor(protected service: ShiftRosterService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            name: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.getOne(+id).subscribe(
                        (data) => {
                            this.loadForm(data);
                        }
                    )
                }
            }
        );
    }

    loadForm(data: any) {
        if (data != null) {
            this.shiftRoster = data;
        }
        this.formGroup.patchValue(this.shiftRoster, { onlySelf: true });
        this.shiftRosterType = this.shiftRoster.shiftRosterType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/shiftRoster/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
