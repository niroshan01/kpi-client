import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { ItemTypeService } from '../../../../services/itemType.service';
import { SharedService } from '../../../../services/shared.service';

@Component({
    selector: 'item-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./itemTypeForm.scss'],
    templateUrl: './itemTypeForm.html',
})
export class ItemTypeForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    itemType: any = {};
    subscription: Subscription;

    itemTypeTypes: any;
    paints: any;

    itemTypeDate: Date;
    itemTypeTime: Date = new Date();
    recoveryTime: Date = new Date();
    itemTypeType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }


    constructor(protected service: ItemTypeService,
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
                    this.service.getOne(+id).then(
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
            data.itemTypeTime = new Date(data.itemTypeTime);
            data.recoveryTime = new Date(data.recoveryTime);
            this.itemType = data;
        }
        this.formGroup.patchValue(this.itemType, { onlySelf: true });
        this.itemTypeType = this.itemType.itemTypeType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/itemType/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}