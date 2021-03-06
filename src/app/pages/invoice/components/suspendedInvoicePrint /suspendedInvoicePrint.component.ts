import { Component, Input } from '@angular/core';
import { InvoiceService } from '../../invoice.service';
import { PrintService } from '../../../../services/print.service';
import { OrganizationService } from '../../../organization/organization.service';
import 'rxjs/add/operator/take';

@Component({
  selector: ' suspended-invoice-print',
  templateUrl: './print.html'
})
export class SuspendedInvoicePrint {
  amount = 0;
  totalAmount = 0.0;
  totalWeight = 0.0;
  otherAmount  = 0.0;
  xAddress: any = null;
  xLoadingPlanItemList = [];

  @Input()
  set id(id: number) {
    if (this.id !== 0) {
      this.service.get(+id).take(1).subscribe(data => {
        if (data === null) return;
          this.invoice = data;

          this.totalAmount = 0.0;
          this.totalWeight = 0.0;
          this.xAddress = null;
          this.xLoadingPlanItemList = [];

          for (let i = 0; i < this.invoice.dispatchNoteList.length; i++) {
            let dispatchNote = this.invoice.dispatchNoteList[i];
            if (dispatchNote === undefined) return;
            let xLoadingPlanList = dispatchNote.loadingPlanList;

            for (let ii = 0; ii < xLoadingPlanList.length; ii++) {
              let xLoadingPlan = xLoadingPlanList[ii];

              if (this.xAddress === null) {
                     this.xAddress = xLoadingPlan.address;
                      }
                  }
              }

            for (let i = 0; i < this.invoice.dispatchNoteList.length; i++) {
            let yLoadingPlanList = this.invoice.dispatchNoteList[i].loadingPlanList;

           for (let ii = 0; ii < yLoadingPlanList.length; ii++) {
            let yLoadingPlanItemList = yLoadingPlanList[ii].loadingPlanItemList;

            for (let iii = 0; iii < yLoadingPlanItemList.length; iii++) {
              let yLoadingPlanItem = yLoadingPlanItemList[iii];

              let yItemId = yLoadingPlanItem.dispatchSchedule.job.item.id;
              let ySalesOrderId = yLoadingPlanItem.dispatchSchedule.salesOrderItem.salesOrder.id;
              let found = false;
            for (let iiii = 0; iiii < this.xLoadingPlanItemList.length; iiii++) {
              let xLoadingPlanItem = this.xLoadingPlanItemList[iiii];
              let xItemId = xLoadingPlanItem.dispatchSchedule.job.item.id;
              let xSalesOrderId = xLoadingPlanItem.dispatchSchedule.salesOrderItem.salesOrder.id;
              if (yItemId === xItemId && ySalesOrderId === xSalesOrderId){
                if (yLoadingPlanItem.unitPrice === null || yLoadingPlanItem.unitPrice === undefined){
                  yLoadingPlanItem.unitPrice = yLoadingPlanItem.dispatchSchedule.salesOrderItem.unitPrice;
                }
                this.totalAmount += yLoadingPlanItem.invoiceQuantity * yLoadingPlanItem.unitPrice;
                xLoadingPlanItem.invoiceQuantity += yLoadingPlanItem.invoiceQuantity;
                xLoadingPlanItem.amount += yLoadingPlanItem.invoiceQuantity * yLoadingPlanItem.unitPrice;
                found = true;
                break;
              }
            }

            if (!found){
              if (yLoadingPlanItem.unitPrice === null || yLoadingPlanItem.unitPrice === undefined){
                yLoadingPlanItem.unitPrice = yLoadingPlanItem.dispatchSchedule.salesOrderItem.unitPrice;
              }
              yLoadingPlanItem.amount = yLoadingPlanItem.invoiceQuantity * yLoadingPlanItem.unitPrice;
              this.totalAmount += yLoadingPlanItem.amount;
              yLoadingPlanItem.weight = yLoadingPlanItem.invoiceQuantity * yLoadingPlanItem.dispatchSchedule.job.item.weight;
              this.totalWeight += yLoadingPlanItem.weight;
              this.xLoadingPlanItemList.push(yLoadingPlanItem);
            }

            }
          }
        }
          setTimeout(() => {
            let element = document.getElementById('suspendedInvoicePrint');
            if (element != null) {
              this.printService.printA4(element.innerHTML);
            }
          }, 100);
        });
    }
  }

  organization: any;
  invoice: any;

  constructor(
    private service: InvoiceService,
    private printService: PrintService,
    private organizationService: OrganizationService) {
    this.getOrganization();
  }

  getOrganization() {
    this.organizationService.getAll().subscribe((data: any) => {
      this.organization = data[0];
    });
  }
}
