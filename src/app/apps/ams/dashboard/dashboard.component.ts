import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FundsService } from 'src/app/shared/moduleservices/funds.service';
import { TransactionsService } from 'src/app/shared/moduleservices/transactions.service';
import { ThemeConstantService } from '../../../shared/services/theme-constant.service';
import { DateService } from 'src/app/shared/moduleservices/date.service';
import { InvoicesService } from 'src/app/shared/moduleservices/invoices.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

    themeColors = this.colorConfig.get().colors;
    blue = this.themeColors.blue;
    blueLight = this.themeColors.blueLight;
    cyan = this.themeColors.cyan;
    cyanLight = this.themeColors.cyanLight;
    gold = this.themeColors.gold;
    purple = this.themeColors.purple;
    purpleLight = this.themeColors.purpleLight;
    red = this.themeColors.red;

    constructor(private colorConfig: ThemeConstantService, private transactionsservice: TransactionsService,
        private fb: FormBuilder,
        private fundService:FundsService,
        public datepipe:DatePipe,
        public dateService:DateService,
        private invoiceService:InvoicesService
    ) { }
    ngOnInit(): void {
        this.transactionsFilterForm();
        this.getTransactions();
        this.getDaysArray(10);
        this.getFunds();
        this.getPiedata();
    }
//graph
    currDate = new Date();
    revenueChartLabels: Array<any> = [];
    revenueChartData: Array<any> = [{
        data: [],
        label: 'No. of Transactions',
        tension: 0.4,
        borderCapStyle:'square',
        borderJoinStyle:'round'
    }];
    transactionForm!: UntypedFormGroup;
    transactions = [];
    loadGraph: boolean = true;
    totalFunds:any = 0;
    fund_info:any = [];

    @ViewChild(BaseChartDirective)
    public chart: BaseChartDirective;

    updateChart() {
        this.chart.chart.update();
    }
    getDaysArray = (number: any) => {
        for (let i = 0; i < number; i++) {
            let x = this.dateService.getDateDiffrence(this.currDate,-i,'do');
            this.revenueChartLabels.push(x) ;  
        }
        return this.revenueChartLabels.reverse();
    }
    getTransactions() {
        this.transactionsservice.getTransactionCount(this.transactionForm.value).subscribe((res:any)=>{
            this.transactions = res;
            for(var i=0; i<10; i++){
                let count = 0;
                let dates = this.dateService.getDateDiffrence(this.currDate,-i,'dd-MM-yyyy');
                this.transactions.forEach((elem:any)=>{
                    let transDate = this.dateService.getDate(new Date(elem.date),'dd-MM-yyyy');
                    if( transDate == dates){
                        count = elem.count
                    }
                })
                this.revenueChartData[0].data.push(count);
            }
            this.revenueChartData[0].data.reverse();
            this.updateChart();
            this.loadGraph = false;
        })
    }

    transactionsFilterForm() {
        let startDate = this.dateService.getDateDiffrence(this.currDate,-9,'yyyy-MM-dd 00:00:00');
        let endDate = this.dateService.getDate(this.currDate,'yyyy-MM-dd 23:59:59')
        this.transactionForm = this.fb.group({
            start_date: [startDate, [Validators.required]],
            end_date: [endDate, [Validators.required]],
        })
    }
    getFunds(): void {
        this.fundService.getFunds().subscribe((res) => {
            this.fund_info = [];
          this.fund_info = res;
          this.fund_info.forEach((elem:any)=>{
            this.totalFunds = this.totalFunds+Number(elem.fund_value);
          })
        })
      }

  
    taskListIndex: number = 0;
    revenueChartFormat: string = 'revenueMonth';
    currentrevenueChartLabelsIdx = 1;
    revenueChartOptions: any = {
        maintainAspectRatio: false,
        responsive: true,
        hover: {
            mode: 'nearest',
            intersect: true
        },
        tooltips: {
            mode: 'index'
        },
        scales: {
            x: {
                gridLines: [{
                    display: false,
                }],
                ticks: {
                    display: true,
                    fontColor: this.themeColors.grayLight,
                    fontSize: 13,
                    padding: 10
                }
            },
            y: {
                gridLines: {
                    drawBorder: false,
                    drawTicks: false,
                    borderDash: [3, 4],
                    zeroLineWidth: 1,
                    zeroLineBorderDash: [3, 4]
                },
                ticks: {
                    display: true,
                    max: 20,
                    stepSize: 2,
                    fontColor: this.themeColors.grayLight,
                    fontSize: 13,
                    padding: 10
                }
            },
        }
    };
    revenueChartColors: Array<any> = [
        {
            backgroundColor: this.themeColors.transparent,
            borderColor: this.blue,
            pointBackgroundColor: this.blue,
            pointBorderColor: this.themeColors.white,
            pointHoverBackgroundColor: this.blueLight,
            pointHoverBorderColor: this.blueLight
        }
    ];
    revenueChartType = 'line';

//doughnut
    customersChartLabels: string[] = [];
    customersChartData: ChartConfiguration<'doughnut'>['data']['datasets'] = [
        { data: [], label: 'Count' },
    ];
    pieData:any = [];
    loadPie:boolean = true;
    customersChartOptions: any = {
        cutout: '70%',
        backgroundColor:[this.cyan, this.purple, this.gold, this.red]
    }
    customersChartType = 'doughnut';
    getPiedata(){
        this.invoiceService.getInvoiceStatus().subscribe((res:any) => {
            this.pieData = res;
            this.pieData.forEach((elem:any) => {
                this.customersChartLabels.push(elem.status.charAt(0).toUpperCase() + elem.status.slice(1));
                this.customersChartData[0].data.push(elem.count);
            });
        this.loadPie = false;
        })
    }

//Bar Chart
    avgProfitChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: true,
                stacked: true,
                scaleLabel: {
                    display: false,
                    labelString: 'Month'
                },
                gridLines: false,
                ticks: {
                    display: true,
                    beginAtZero: true,
                    fontSize: 13,
                    padding: 10
                }
            },
            y: {
                display: true,
                stacked: true,
                scaleLabel: {
                    display: false,
                    labelString: 'Value'
                },
                gridLines: {
                    drawBorder: false,
                    offsetGridLines: false,
                    drawTicks: false,
                    borderDash: [3, 4],
                    zeroLineWidth: 1,
                    zeroLineBorderDash: [3, 4]
                },
                ticks: {
                    stepSize: 40,
                    display: true,
                    beginAtZero: true,
                    fontSize: 13,
                    padding: 10
                }
            }
        }
    };
    avgProfitChartLabels: string[] = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    avgProfitChartType = 'bar';
    avgProfitChartLegend = false;
    avgProfitChartColors: Array<any> = [
        {
            backgroundColor: this.blue,
            borderWidth: 0
        },
        {
            backgroundColor: this.blueLight,
            borderWidth: 0
        }
    ];
    avgProfitChartData: any[] = [
        {
            data: [38, 38, 30, 19, 56, 55, 31],
            label: 'Series A',
            categoryPercentage: 0.35,
            barPercentage: 0.3,
        },
        {
            data: [55, 69, 90, 81, 86, 27, 77],
            label: 'Series B',
            categoryPercentage: 0.35,
            barPercentage: 0.3,
        }
    ];

    productsList = [
        {
            name: 'Gray Sofa',
            avatar: 'assets/images/others/thumb-9.jpg',
            earn: 1912,
            sales: 81,
            stock: 82,
        },
        {
            name: 'Beat Headphone',
            avatar: 'assets/images/others/thumb-10.jpg',
            earn: 1377,
            sales: 26,
            stock: 61
        },
        {
            name: 'Wooden Rhino',
            avatar: 'assets/images/others/thumb-11.jpg',
            earn: 9212,
            sales: 71,
            stock: 23,
        },
        {
            name: 'Red Chair',
            avatar: 'assets/images/others/thumb-12.jpg',
            earn: 1298,
            sales: 79,
            stock: 54,
        },
        {
            name: 'Wristband',
            avatar: 'assets/images/others/thumb-13.jpg',
            earn: 7376,
            sales: 60,
            stock: 76,
        }
    ]

    fileList = [
        {
            icon: "file-word",
            name: "Documentation.doc",
            color: this.blue,
            size: "1.2MB"
        },
        {
            icon: "file-excel",
            name: "Expensess.xls",
            color: this.cyan,
            size: "518KB"
        },
        {
            icon: "file-text",
            name: "Receipt.txt",
            color: this.purple,
            size: "355KB"
        },
        {
            icon: "file-word",
            name: "Project Requirement.doc",
            color: this.blue,
            size: "1.6MB"
        },
        {
            icon: "file-pdf",
            name: "App Flow.pdf",
            color: this.red,
            size: "19.8MB"
        },
        {
            icon: "file-ppt",
            name: "Presentation.ppt",
            color: this.gold,
            size: "2.7MB"
        },
    ]

    activityList = [
        {
            name: "Virgil Gonzales",
            avatar: this.blue,
            date: "10:44 PM",
            action: "Complete task",
            target: "Prototype Design",
            actionType: "completed"
        },
        {
            name: "Lilian Stone",
            avatar: this.cyan,
            date: "8:34 PM",
            action: "Attached file",
            target: "Mockup Zip",
            actionType: "upload"
        },
        {
            name: "Erin Gonzales",
            avatar: this.gold,
            date: "8:34 PM",
            action: "Commented",
            target: "'This is not our work!'",
            actionType: "comment"
        },
        {
            name: "Riley Newman",
            avatar: this.blue,
            date: "8:34 PM",
            action: "Commented",
            target: "'Hi, please done this before tommorow'",
            actionType: "comment"
        },
        {
            name: "Pamela Wanda",
            avatar: this.red,
            date: "8:34 PM",
            action: "Removed",
            target: "a file",
            actionType: "removed"
        },
        {
            name: "Marshall Nichols",
            avatar: this.purple,
            date: "5:21 PM",
            action: "Create",
            target: "this project",
            actionType: "created"
        }
    ]

    taskListToday = [
        {
            title: "Define users and workflow",
            desc: "A cheeseburger is more than sandwich",
            checked: false
        },
        {
            title: "Schedule jobs",
            desc: "I'm gonna build me an airport",
            checked: true
        },
        {
            title: "Extend the data model",
            desc: "Let us wax poetic about cheeseburger.",
            checked: true
        },
        {
            title: "Change interface",
            desc: "Efficiently unleash cross-media information",
            checked: false
        },
        {
            title: "Create databases",
            desc: "Here's the story of a man named Brady",
            checked: false
        }
    ];

    taskListWeek = [
        {
            title: "Verify connectivity",
            desc: "Bugger bag egg's old boy willy jolly",
            checked: false
        },
        {
            title: "Order console machines",
            desc: "Value proposition alpha crowdsource",
            checked: false
        },
        {
            title: "Customize Template",
            desc: "Do you see any Teletubbies in here",
            checked: true
        },
        {
            title: "Batch schedule",
            desc: "Trillion a very small stage in a vast",
            checked: true
        },
        {
            title: "Prepare implementation",
            desc: "Drop in axle roll-in rail slide",
            checked: true
        }
    ];

    taskListMonth = [
        {
            title: "Create user groups",
            desc: "Nipperkin run a rig ballast chase",
            checked: false
        },
        {
            title: "Design Wireframe",
            desc: "Value proposition alpha crowdsource",
            checked: true
        },
        {
            title: "Project Launch",
            desc: "I'll be sure to note that",
            checked: false
        },
        {
            title: "Management meeting",
            desc: "Hand-crafted exclusive finest",
            checked: false
        },
        {
            title: "Extend data model",
            desc: "European minnow priapumfish mosshead",
            checked: true
        }
    ]
}


