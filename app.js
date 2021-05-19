let matrix = [
  [1, 1, -1, 7],
  [1, -1, 2, 3],
  [2, 1, 1, 9],
];
let contador = 0;
const GaussJordan = (mat) => {
  AddDomMatrix(mat);
};

const Product = (row, coef) => {
  const newRow = row.map((item) => item * coef);
  return newRow;
};
const SumRows = (row1, row2) => {
  let newRow = [];
  for (let i = 0; i < row1.length; i++) {
    const element = row1[i] + row2[i];
    newRow.push(element);
  }
  return newRow;
};

const SwapRows = (mat, row1, row2) => {
  const firstRow = mat[row1 - 1];
  const secondRow = mat[row2 - 1];
  let newMat = [];
  mat.forEach((row) => {
    newMat.push(row);
  });
  newMat[row1 - 1] = secondRow;
  newMat[row2 - 1] = firstRow;
  contador++;
  AddDomMatrix(newMat, `R<sub>${row1}</sub> ⟷ R<sub>${row2}</sub>`);
  return newMat;
};

const ScalarProd = (mat, row, coef) => {
  let newMat = [];
  for (let i = 0; i < mat.length; i++) {
    if (i + 1 != row) {
      newMat.push(mat[i]);
    } else {
      const newRow = Product(mat[i], coef);
      newMat.push(newRow);
    }
  }
  contador++;
  AddDomMatrix(
    newMat,
    `R<sub>${row}</sub>(${coef.toFixed(2)}) ⟶ R<sub>${row}</sub>`
  );
  return newMat;
};

const SumAndProd = (mat, r1, p1, r2, p2, target) => {
  let newMat = [];
  for (let i = 0; i < mat.length; i++) {
    newMat.push(mat[i]);
  }
  newMat[target - 1] = SumRows(
    Product(mat[r1 - 1], p1),
    Product(mat[r2 - 1], p2)
  );
  contador++;
  AddDomMatrix(
    newMat,
    `R<sub>${r1}</sub>${p1 == 1 ? "" : "(" + p1 + ")"} + R<sub>${r2}</sub>${
      p2 == 1 ? "" : "(" + p2 + ")"
    } ⟶ R<sub>${target}</sub>`
  );
  return newMat;
};

const AddDomMatrix = (mat, paso = "") => {
  const element = `
    <div class="matrix">
      <div class="titlulo">
      
        <h3>${contador != 0 ? "Paso " + contador : "Matriz inicial"}</h3>
        <h4 class="paso">${contador != 0 ? paso : ""}</h4>
      </div>
        ${mat
          .map((row, i) => {
            {
              let str = "<div class='row'><h2>";
              for (let i = 0; i < row.length - 1; i++) {
                const element = row[i].toString();
                switch (element.length) {
                  case 1:
                    str += element + "</h2><h2>";
                    break;
                  case 2:
                    str += element + "</h2><h2>";
                    break;
                  case 3:
                    str += element + "</h2><h2>";
                    break;
                }
              }
              str += "|</h2><h2>" + row[row.length - 1] + "</h2></div>";
              return str;
            }
          })
          .join("")}
      
    </div>
  `;
  document.getElementById("container").insertAdjacentHTML("beforeend", element);
};

GaussJordan(matrix);
