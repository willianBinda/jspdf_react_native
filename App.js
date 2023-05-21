import React from "react";
import { Button, View } from "react-native";
import HTMLTOPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';

export default () => {
  const gerar = async () => {
    const dados_cinco_mil = [];

    for (let i = 0; i < 100; i++) {
      dados_cinco_mil.push(i);
    }

    const tr = dados_cinco_mil
      .map(
        e => `
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
          </tr>
        `
      )
      .join("");

    const model = `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <style>
              @page {
                margin-top: 40mm;
                margin-bottom: 15mm;
              }
              
              .header {
                  width: 100%;
                  justify-content: space-between;
                  display: flex;
                  position: fixed;
                  top: 0;
                  left: 0;
              }
      
              .text_header {
                  font-size: 20px;
                  align-self: center;
              }
      
              .title {
                  font-size: 25px;
                  text-align: center;
                  width: 100%;
                  margin-top: 20px;
                  margin-bottom: 20px;
              }
      
              .tabela {
                  width: 100%;
                  text-align: center;
              }
      
              .table {
                  margin: auto;
              }
      
              td {
                  border: none;
                  font-size: 10px;
              }
      
              th {
                  border: none;
              }
      
              .even_odd tr:nth-child(even) {
                  background: lightgray;
              }
      
              .botton {
                  text-align: left;
              }
              
              .footer {
                  position: fixed;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  text-align: center;
                  font-size: 10px;
              }
          </style>
      </head>
      
      <body>
          <div class="header">
              <img src='https://teslacomercial.com.br/novo/wp-content/uploads/2021/08/21.png' width="150px" height="50px">
              <div class="text_header">Relatório insensibilização - Linha 1 - </div>
              <div class="text_header">CLIENTE E UNIDADE</div>
          </div>
          <div class="title">
              Fluxo Equipamentos Industrial
          </div>
          <div class="tabela">
              <table class="table">
                  <thead>
                      <tr>
                          <th>Equipamento</th>
                          <th>Duty Cycle</th>
                          <th>Tempo ON</th>
                          <th>Tempo OFF</th>
                          <th>Forma de onda</th>
                          <th>Corrente</th>
                          <th>Frequencia</th>
                          <th>Tensao</th>
                      </tr>
                  </thead>
                  <tbody class="even_odd">
                      ${tr}
                  </tbody>
                  <tfoot>
                      <tr>
                          <td colspan="8" class="botton">
                              Data de geração do relatório:
                          </td>
                      </tr>
                  </tfoot>
              </table>
          </div>
          <htmlpageheader name="header">
            <div class="header">
              <img src='https://teslacomercial.com.br/novo/wp-content/uploads/2021/08/21.png' width="150px" height="50px">
              <div class="text_header">Relatório insensibilização - Linha 1 - </div>
              <div class="text_header">CLIENTE E UNIDADE</div>
            </div>
          </htmlpageheader>
          <htmlpagefooter name="footer">
            <div class="footer">
              <script>
                function subst() {
                  var footer = document.getElementsByClassName("footer");
                  var pageCount = document.querySelectorAll(".pdf-page").length;
                  for (var i = 0; i < footer.length; i++) {
                    footer[i].innerHTML = "<div>Página " + pageNum + " de " + pageCount + "</div>";
                  }
                }
                subst();
              </script>
            </div>
          </htmlpagefooter>
      </body>
      
      </html>
    `;

    const options = {
      html: model,
      fileName: 'Relatório5',
      directory: 'Downloads',
    //   height: '11in',
    //   width: '8.5in',
      padding: '10px',
      footerHeight: '10mm',
      headerHeight: '40mm',
    };

    try {
      const file = await HTMLTOPDF.convert(options);
      FileViewer.open(file.filePath);
      console.log('Gerando PDF!!!');
    } catch (error) {
      console.log('ERRO AO VISUALIZAR PDF:', error);
    }
  };

  return (
    <View>
      <Button title="Gerar" onPress={gerar} />
    </View>
  );
};



















// import { Button, View } from "react-native"
// import HTMLTOPDF from 'react-native-html-to-pdf'
// import FIleViewer from 'react-native-file-viewer'

// export default () => {


//     const gerar = async () => {
//         var dados_cinco_mil = []
        
//         for(let i = 0;i<100;i++){
//             dados_cinco_mil.push(i)
//         }
//         const tr = dados_cinco_mil.map(e =>
//             `
//                 <tr>
//                     <td>1</td>
//                     <td>2</td>
//                     <td>3</td>
//                     <td>4</td>
//                     <td>5</td>
//                     <td>6</td>
//                     <td>7</td>
//                     <td>8</td>
//                 </tr>
//             `).join("")
//         // console.log(tr)
//         const model =
//             `
//     <!DOCTYPE html>
//     <html lang="en">
    
//     <head>
//         <style>
//             .header {
//                 width: 100%;
//                 justify-content: space-between;
//                 display: flex;
//             }
    
//             .text_header {
//                 font-size: 20;
//                 align-self: center;
//             }
    
//             .title {
//                 font-size: 25px;
//                 text-align: center;
//                 width: 100%;
//                 margin-top: 20px;
//                 margin-bottom: 20px;
//             }
    
//             .tabela {
//                 width: 100%;
//                 text-align: center;
//             }
    
//             .table {
//                 margin: auto;
//             }
    
//             td {
//                 border: none;
//                 font-size: 10px;
//             }
    
//             th {
//                 border: none;
//             }
    
//             .even_odd tr:nth-child(even) {
//                 background: lightgray;
//             }
    
//             .botton {
//                 text-align: left;
//             }
//         </style>
//     </head>
    
//     <body>
//         <div class="header">
//             <img src='https://teslacomercial.com.br/novo/wp-content/uploads/2021/08/21.png' width="150px" height="50px">
//             <div class="text_header">Relatório insensibilização - Linha 1 - </div>
//             <div class="text_header">CLIENTE E UNIDADE</div>
//         </div>
//         <div class="title">
//             Fluxo Equipamentos Industrial
//         </div>
//         <div class="tabela">
//             <table class="table">
//                 <thead>
//                     <tr>
//                         <th>Equipamento</th>
//                         <th>Duty Cycle</th>
//                         <th>Tempo ON</th>
//                         <th>Tempo OFF</th>
//                         <th>Forma de onda</th>
//                         <th>Corrente</th>
//                         <th>Frequencia</th>
//                         <th>Tensao</th>
//                     </tr>
//                 </thead>
//                 <tbody class="even_odd">
//                     ${tr}
//                 </tbody>
//                 <tfoot>
//                     <tr>
//                         <td colspan="9" class="botton">
//                             Data de geração do relátorio: 
//                         </td>
//                     </tr>
//                 </tfoot>
//             </table>
//         </div>
//     </body>
    
//     </html>
// `
//         const options = {
//             html: model,
//             fileName: 'Relatório5',
//             directory: 'Downloads',
//             // directory: '../../../../Download',
//         };
//         const file = await HTMLTOPDF.convert(options)
//         // console.log(file.filePath)
//         FIleViewer.open(file.filePath)
//             .then(() => {
//                 console.log('gerando PDF!!!')
//             })
//             .catch((error) => {
//                 console.log("ERRO AO VISUALIZAR PDF")
//             });
//     }



//     return (
//         <View>
//             <Button
//                 title="gerar"
//                 onPress={() => { gerar() }}
//             />
//         </View>
//     )
// }
