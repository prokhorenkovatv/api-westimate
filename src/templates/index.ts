const pdfTemplate = (project: any) => {
  const today = new Date();
  return `
   <!DOCTYPE html>
   <html>
   <head>
      <meta charset="utf-8" />
      <title>PDF Result Template</title>
      <style>
         .estimation-box {
         max-width: 800px;
         margin: auto;
         padding: 30px;
         border: 1px solid grey;
         box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
         font-size: 16px;
         line-height: 24px;
         font-family: "Helvetica Neue", "Helvetica";
         color: grey;
         }
         .margin-top {
         margin-top: 50px;
         }
         .estimation-box table {
         width: 100%;
         line-height: inherit;
         text-align: left;
         }
         .estimation-box table td {
         padding: 5px;
         vertical-align: top;
         }
         .estimation-box table tr td:nth-child(2) {
         text-align: right;
         }
         .estimation-box table tr.top table td {
         padding-bottom: 5px;
         }
         .estimation-box table tr.top table td.title {
         display: flex;
         font-size: 40px;
         line-height: 45px;
         color: dark-grey;
         }
         .estimation-box table tr.top table td.title svg {
         height: 70px;
         width: 86px;
         }
         .estimation-box table tr.information table {
         padding-bottom: 40px;
         }
         .estimation-box table tr.heading td {
         background: white;
         border-bottom: 1px solid white;
         font-weight: bold;
         }
         .estimation-box table tr.details td {
         padding-bottom: 20px;
         }
         .estimation-box table tr.item td {
         border-bottom: 1px solid white;
         }
         .estimation-box table tr.item.last td {
         border-bottom: none;
         }
         .estimation-box table tr.total td:nth-child(2) {
         border-top: 2px solid white;
         font-weight: bold;
         }
         @media only screen and (max-width: 600px) {
         .estimation-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
         }
         .estimation-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
         }
         }
      </style>
   </head>
   <body>
      <div class="estimation-box">
         <table cellpadding="0" cellspacing="0">
         <tr class="top">
            <td colspan="2">
               <table>
               <tr>
                  <td class="title">
                     <svg
                     width="50"
                     height="43"
                     viewBox="0 0 50 43"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     >
                     <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.35476 0.11021L1.78333 0.993312V6.56794L4.35476 0.11021ZM1.78333 0.993312L0 1.69912L1.78524 6.56794V0.993312H1.78333ZM16.3205 7.95417L13.8676 12.7727L18.9852 15.3995L16.3205 7.95417ZM28.6495 7.90912L30 0.101582L27.0295 3.23102L28.6495 7.90912ZM30 0.101582L27.4286 1.02446L27.0295 3.22862L30 0.101582ZM28.0476 11.3802L28.6476 7.91009L26.269 7.42613L28.0476 11.3802ZM28.6476 7.91009L27.0286 3.23102L26.271 7.42708L28.6476 7.91009ZM28.0476 11.3802L26.271 7.42708L25.3386 12.5834L28.0476 11.3802ZM20.0952 18.4958L21.5676 22.562L24.3338 18.1537L20.0952 18.4958ZM21.5676 22.562L25.3586 21.1993L24.3333 18.1508L21.5676 22.562ZM25.3586 21.1993L26.4229 20.8346L24.3338 18.1513L25.3586 21.1993ZM18.9867 15.4014L20.0952 18.4968L24.3333 18.1523L18.9867 15.4014ZM25.34 12.5839L18.9867 15.4014L24.3333 18.1508L25.34 12.5839ZM26.4229 20.8356L28.0476 11.3802L24.3333 18.1508L26.4229 20.8356ZM28.0476 11.3802L25.3367 12.5824L24.3333 18.1508L28.0476 11.3802ZM16.3205 7.95417L18.9871 15.3995L21.8095 10.7697L16.3205 7.95417ZM15.3343 5.19896L16.3205 7.95417L20.2567 6.23444L15.3343 5.19896ZM16.3205 7.95417L21.8095 10.7697L20.2586 6.23444L16.3205 7.95417ZM15.3343 5.19896L20.2567 6.23444L18.1238 0L15.3343 5.19896ZM15.3343 5.19896L18.1238 0L14.0029 1.4581L15.3343 5.19896ZM13.8676 12.7727L16.3205 7.95417L14.0048 6.74044L13.8676 12.7727ZM16.3205 7.95417L15.3343 5.19896L14.0048 6.74044L16.3205 7.95417ZM15.3343 5.19896L14.001 1.45762V6.74092L15.3343 5.19896ZM13.8676 12.7727L14.0048 6.74044L10.9776 11.2896L13.8676 12.7727ZM4.43476 13.7669L7.80953 23L10.97 17.1254L4.43476 13.7669ZM7.80953 23L10.97 21.8711V17.1273L7.80953 23ZM10.9762 11.2896L4.43333 13.7669L10.97 17.1254L10.9762 11.2896ZM13.8662 12.7751L10.9762 11.2896L10.9714 17.1254L13.8662 12.7751ZM4.35476 0.11021L1.78333 6.56794L7.83095 9.67486L4.35476 0.11021ZM1.78333 6.56794L4.43333 13.7669L7.83143 9.67533L1.78333 6.56794ZM4.43333 13.7669L10.9762 11.2896L7.83333 9.67533L4.43333 13.7669Z"
                        fill="grey"
                     />
                     </svg>
                     <span>Project estimation</span>
                  </td>
                  
               </tr>
               </table>
            </td>
         </tr>
         <tr class="information">
            <td colspan="2">
               <table>
               <tr>
                  <td>
                    Date: ${`${today.toISOString()}`}
                  </td>
               </tr>
               <tr>
                  <td>
                     Project title: ${project.title}
                  </td>
               </tr>
               <tr>
                  <td>
                     Description: ${project.description}
                  </td>
               </tr>
               <tr>
                  <td>
                     Price per hour: ${project.price_per_hour}
                  </td>
               </tr>
               
               </table>
            </td>
         </tr>
         <tr class="heading">
            <td>Estimation:</td>
            <td>Days</td>
         </tr>
         <tr class="item">
            <td>Design:</td>
            <td>${parseInt(project.design_days)}</td>
         </tr>
         <tr class="item">
            <td>QA:</td>
            <td>${parseInt(project.qa_days)}</td>
         </tr>
         <tr class="item">
            <td>Infrastructure:</td>
            <td>${parseInt(project.infrastructure_days)}</td>
         </tr>
         <tr class="item">
            <td>Management:</td>
            <td>${parseInt(project.management_days)}</td>
         </tr>
         <tr class="item">
            <td>Release:</td>
            <td>${parseInt(project.release_days)}</td>
         </tr>
         <tr class="item">
            <td>Analysis:</td>
            <td>${parseInt(project.analysis_days)}</td>
         </tr>
         <tr class="item">
            <td>Support:</td>
            <td>${parseInt(project.support_days)}</td>
         </tr>
         </table>
         <br />
         <h3>Total hours: ${parseInt(project.total_hours)}</h3>
         <h3>Total price: ${parseInt(project.total_price)}$</h3>
      </div>
   </body>
   </html>
   `;
};

export default pdfTemplate;
