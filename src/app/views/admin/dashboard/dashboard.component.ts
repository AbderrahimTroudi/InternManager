import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { ServicesService } from '../../services/services.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  vartest1:any=[1,2]
  vartest2:any=[3,4]
   vartest3:any=[...this.vartest1, ...this.vartest2];

  chartOptions = {};
  chartLine = {};
  chartPie = {};
  hcharts = Highcharts;
  InternsData:any
  CandidateData:any;
  MentorData:any;
  InternshipData:any;
  ApplicationData:any;
  currentInterval = 'month'; // initial value is month
  chart: any;
  currentPage :any=1
  numbers:any
itemsPerPage = 5;
totalPages = [2]
Interval= 30*24 * 3600*1000;



monthlyCountsApplication:any
ts:any
  xAxisOptions :any={
    type: 'datetime',
    accessibility: {
      rangeDescription: 'Range: January 2010 to December 2020'
    },
    dateTimeLabelFormats: {
      month: '%b %Y'
    }
  }

  constructor(private ds: ServicesService) {
console.log("vartest3 : ",this.vartest3)
  }

  ngOnInit(): void {
    HC_exporting(Highcharts);

    this.ds.getAllStudents('candidate/getall').subscribe(data => {
      this.CandidateData = data;
    });
    this.ds.getAllStudents('candidate/getinterns').subscribe(data => {
      this.InternsData = data;
      this.ts = this.generateMonthlyApplicationCounts(this.InternsData);
console.log("number of date ",this.ts)
    });
    this.ds.getAllStudents('suprivisor/getall').subscribe(data => {
      this.MentorData = data;
    });
    this.ds.getAllStudents('application/getallapplication').subscribe(data => {
      this.ApplicationData = data;
      this.tableData=this.ApplicationData
      this.numbers = [Math.ceil(this.ApplicationData.length / this.itemsPerPage)];
      this.totalPages = Array.from({length: this.numbers}, (_, i) => i + 1);


      // Use the monthly counts to update the chart data
      this.updateAxis();
      this.showChartBar(this.ApplicationData.length,this.xAxisOptions,this.monthlyCountsApplication,this.ts);
      this.chart=Highcharts.chart('chart-container', this.chartOptions);
      this.showChartPie();
      Highcharts.chart('chart-pie', this.chartPie);


    });

    
  }

  showChartBar(ApplicationData:any,xAxisOptions:any,monthlyCountsApplication:any,monthlyCountsIntern:any) {
console.log("ONE")
const interns = this.InternsData.length;

console.log("two",interns)

    this.chartOptions = {
    chart:{type:'line'},
    title: {
      text: 'Internship application',
      align: 'center'
    },
    
   
     //to make the yAxis dynamic you need to put it with xAxis option in the update axis and put its value based on the monthlyCount highest value
      yAxis: [{
        title: {
          text: 'Number of Internship Application'
        },
        min: 0,  // set the minimum value of yAxis
        max: ApplicationData,  // set the maximum value of yAxis
        tickInterval: 1  // set the interval between tick
      },
    {  title: {
      text: 'Number of Interns'
    },
    min: 0,  // set the minimum value of yAxis
    max: interns,  // set the maximum value of yAxis
    tickInterval: 1  // set the interval between tick
    }],
    
      xAxis: 
      xAxisOptions,

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
    
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: Date.UTC(2023, 0), // January 2023
          pointInterval: this.Interval // 1 month = 30 days
        }
      },
    
      series: [{
        name: 'Internship application',
        data: monthlyCountsApplication,
        yAxis: 0,
        visible: true // set visibility to true
        
      },{
      name: 'Interns',
      data: monthlyCountsIntern,
      yAxis: 1,

    }
    ]
    
     
    }
    Highcharts.chart('chart-container', this.chartOptions);
 
    
  }
  
  showChartPie() {
    const mentor = this.MentorData.length;
    const candidate = this.CandidateData.length;

    console.log("pieee")
        this.chartPie = { chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Numbers of Inters and Mentors',
          align: 'left'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }}},
        
        series: [{
          name: 'percentatge',
          colorByPoint: true,
          data: [{
            name:"Mentor",
            y: mentor,
            sliced: true,
            selected: true
          },{
             name:"Interns",
            y: candidate,
            sliced: true,
            selected: true
          }]
        }]}     
        
      }

  updateAxis() {
    if (this.currentInterval === 'month') {
      this.xAxisOptions = {
        type: 'datetime',
        accessibility: {
          rangeDescription: 'Range: January 2023 to December 2023'
        },
        dateTimeLabelFormats: {
          month: '%b %Y'
        }
      };
      this.Interval=30*24 * 3600*1000;
      this.monthlyCountsApplication = this.generateMonthlyApplicationCounts(this.ApplicationData);
      this.ts = this.generateMonthlyApplicationCounts(this.InternsData);

      console.log("Months:",this.xAxisOptions)
      this.showChartBar(this.ApplicationData.length, this.xAxisOptions,this.monthlyCountsApplication,this.ts);
    }  if(this.currentInterval === 'day') {
      this.xAxisOptions = {
        type: 'datetime',
      dateTimeLabelFormats: {
        day: '%A' // Displays the full name of the day of the week (e.g. Monday)
      },
      accessibility: {
        rangeDescription: 'Range: sunday to saturday'
      }
      };
      this.Interval=24 * 3600*1000;
      this.monthlyCountsApplication = this.generateDailyApplicationCounts(this.ApplicationData);
      this.ts = this.generateDailyApplicationCounts(this.InternsData);

      console.log("days:",this.xAxisOptions)

      this.showChartBar(this.ApplicationData.length, this.xAxisOptions,this.monthlyCountsApplication,this.ts);
    }
     if(this.currentInterval === 'year') {
      this.xAxisOptions = {
        type: 'datetime',
      dateTimeLabelFormats: {
        year: '%Y' // Displays the full name of the day of the week (e.g. Monday)
      },
      accessibility: {
        rangeDescription: 'Range: 2023 to 2030'
      }
      };
      this.Interval=12*30*24 * 3600*1000;
      this.monthlyCountsApplication = this.generateYearlyApplicationCounts(this.ApplicationData);
      console.log("monthlyCountsApplication:",this.monthlyCountsApplication)
      this.ts = this.generateYearlyApplicationCounts(this.InternsData);

      console.log("YEARS:",this.xAxisOptions)

      this.showChartBar(this.ApplicationData.length, this.xAxisOptions,this.monthlyCountsApplication,this.ts);
    }
  }
  
//Application part
  generateMonthlyApplicationCounts(data: any[]) {
    // Create an object to hold the monthly application counts
    const monthlyCountsApplication :any= {};
  
    // Loop through the data and increment the count for each month
    data.forEach(item => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1; // Add 1 because getMonth() returns 0-based index
      if (monthlyCountsApplication[month]) {
        monthlyCountsApplication[month] += 1;
      } else {
        monthlyCountsApplication[month] = 1;
      }
    });
  
    // Create an array of the monthly counts in chronological order
    const monthlyCountsApplicationArray = [];
    for (let month = 1; month <= 12; month++) {
      monthlyCountsApplicationArray.push(monthlyCountsApplication[month] || 0);
    }
  
    return monthlyCountsApplicationArray;
  }
 

  generateDailyApplicationCounts(data: any[]) {
    // Create an object to hold the monthly application counts
    const monthlyCountsApplication :any= {};
  
    // Loop through the data and increment the count for each month
    data.forEach(item => {
      const date = new Date(item.date);
      const month = date.getDay() + 1; // Add 1 because getMonth() returns 0-based index
      if (monthlyCountsApplication[month]) {
        monthlyCountsApplication[month] += 1;
      } else {
        monthlyCountsApplication[month] = 1;
      }
    });
  
    // Create an array of the monthly counts in chronological order
    const monthlyCountsApplicationArray = [];
    for (let day = 1; day <= 7; day++) {
      monthlyCountsApplicationArray.push(monthlyCountsApplication[day] || 0);
    }
  
    return monthlyCountsApplicationArray;
  }
  
  generateYearlyApplicationCounts(data: any[]) {
    // Create an object to hold the yearly application counts
    const yearlyCounts: any = {};
  
    // Loop through the data and increment the count for each year
    data.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      console.log("the year item :",year)
      if (yearlyCounts[year]) {
        yearlyCounts[year] += 1;
      } else {
        yearlyCounts[year] = 1;
      }
    });
  
    // Create an array of the yearly counts in chronological order
    const yearlyCountsArray = [];
    for (let year = 2023; year <= 2030; year++) {
      yearlyCountsArray.push(yearlyCounts[year] || 0);
    }
  
    return yearlyCountsArray;
  }
  
//Intern part

  generateMonthlyInternCounts(data: any[]) {
    // Create an object to hold the monthly application counts
    const monthlyCountsApplication :any= {};
  
    // Loop through the data and increment the count for each month
    data.forEach(item => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1; // Add 1 because getMonth() returns 0-based index
      if (monthlyCountsApplication[month]) {
        monthlyCountsApplication[month] += 1;
      } else {
        monthlyCountsApplication[month] = 1;
      }
    });
  
    // Create an array of the monthly counts in chronological order
    const monthlyCountsApplicationArray = [];
    for (let month = 1; month <= 12; month++) {
      monthlyCountsApplicationArray.push(monthlyCountsApplication[month] || 0);
    }
  
    return monthlyCountsApplicationArray;
  }
  generateDailyInternCounts(data: any[]) {
    // Create an object to hold the monthly application counts
    const monthlyCountsApplication :any= {};
  
    // Loop through the data and increment the count for each month
    data.forEach(item => {
      const date = new Date(item.date);
      const month = date.getDay() + 1; // Add 1 because getMonth() returns 0-based index
      if (monthlyCountsApplication[month]) {
        monthlyCountsApplication[month] += 1;
      } else {
        monthlyCountsApplication[month] = 1;
      }
    });
  
    // Create an array of the monthly counts in chronological order
    const monthlyCountsApplicationArray = [];
    for (let day = 1; day <= 7; day++) {
      monthlyCountsApplicationArray.push(monthlyCountsApplication[day] || 0);
    }
  
    return monthlyCountsApplicationArray;
  }
  generateYearlyInternCounts(data: any[]) {
    // Create an object to hold the yearly application counts
    const yearlyCounts: any = {};
  
    // Loop through the data and increment the count for each year
    data.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      console.log("the year item :",year)
      if (yearlyCounts[year]) {
        yearlyCounts[year] += 1;
      } else {
        yearlyCounts[year] = 1;
      }
    });
  
    // Create an array of the yearly counts in chronological order
    const yearlyCountsArray = [];
    for (let year = 2023; year <= 2030; year++) {
      yearlyCountsArray.push(yearlyCounts[year] || 0);
    }
  
    return yearlyCountsArray;
  }
  



  tableData:any
  ChangeTableDataToOnlySubmitted() {
    this.tableData = this.ApplicationData.filter((app: { status: string; }) => app.status === 'submitted');
  }
  
  ChangeTableDataToOnlyAccepted() {
    this.tableData = this.ApplicationData.filter((app: { status: string; }) => app.status === 'accepted');
  }
  
  ChangeTableDataToOnlyRefused() {
    this.tableData = this.ApplicationData.filter((app: { status: string; }) => app.status === 'refused');
  }
  ChangeTableDataToDisplayAll() {
    this.tableData = this.ApplicationData;
  }
  
  get pagedApplicationData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
  
    return this.tableData.slice(startIndex, endIndex);
  }

   isRecent(dateStr: string): boolean {
    const today = new Date();
    const date = new Date(dateStr);
    const diff = Math.abs(today.getTime() - date.getTime());
    const diffInHours = diff / (1000 * 60 * 60);
    return diffInHours <= 48;
  }
  
  
}