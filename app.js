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
  const _coef = coef;
  coef = op == "x" ? coef : 1 / coef;
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
    `R<sub>${row}</sub> ${op} (${_coef}) ⟶ R<sub>${row}</sub>`
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
      
        <h3>${contador != 0 ? "Paso " + contador : "Paso 0"}</h3>
        <h4 class="paso">${contador != 0 ? paso : "Matriz inicial"}</h4>
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
  document
    .getElementById("matrices-container")
    .insertAdjacentHTML("beforeend", element);
};

const ProcessMatrix = (index) => {
  switch (index) {
    case 1: {
      const r1 = document.getElementById("p1_r1");
      const r2 = document.getElementById("p1_r2");
      const target = document.getElementById("p1_target");
      const p1 = document.getElementById("p1_coef1");
      const p2 = document.getElementById("p1_coef2");
      matrix = SumAndProd(
        matrix,
        r1.value,
        p1.value,
        r2.value,
        p2.value,
        target.value
      );
      r1.value = "";
      p1.value = "";
      r2.value = "";
      p2.value = "";
      target.value = "";
      r1.focus();
      break;
    }
    case 2: {
      const r1 = document.getElementById("p2_r1");
      const r2 = document.getElementById("p2_r2");
      matrix = SwapRows(matrix, r1.value, r2.value);
      r1.value = "";
      r2.value = "";
      break;
    }
    case 3: {
      const r1 = document.getElementById("p3_r1");
      const coef = document.getElementById("p3_coef");
      matrix = ScalarProd(matrix, r1.value, coef.value);
      r1.value = "";
      coef.value = "";
      break;
    }
  }
  // document.getElementById("matrices-container").scrollLeft = 99999;
  return false;
};

let op = "x";
const toogleOpBtn = (e) => {
  op = op == "x" ? "/" : "x";
  e.innerHTML = op;
};

const changeEcuation = (element) => {
  const e1 = document.getElementById("equation_1");
  const e2 = document.getElementById("equation_2");
  const e3 = document.getElementById("equation_3");
  switch (element.id) {
    case "r1_x":
    case "r1_y":
    case "r1_z":
    case "r1_res": {
      let x = document.getElementById("r1_x").value;
      let y = document.getElementById("r1_y").value;
      let z = document.getElementById("r1_z").value;
      let res = document.getElementById("r1_res").value;

      x = x != 0 ? x + "x" : "";
      y = y != 0 ? (y < 0 ? "- " + Math.abs(y) + "y" : "+ " + y + "y") : "";
      z = z != 0 ? (z < 0 ? "- " + Math.abs(z) + "z" : "+ " + z + "z") : "";
      res = res != 0 ? res : "";

      e1.innerHTML = `
        ${x}
        ${y}
        ${z} = ${res}`;
      break;
    }
    case "r2_x":
    case "r2_y":
    case "r2_z":
    case "r2_res": {
      let x = document.getElementById("r2_x").value;
      let y = document.getElementById("r2_y").value;
      let z = document.getElementById("r2_z").value;
      let res = document.getElementById("r2_res").value;

      x = x != 0 ? x + "x" : "";
      y = y != 0 ? (y < 0 ? "- " + Math.abs(y) + "y" : "+ " + y + "y") : "";
      z = z != 0 ? (z < 0 ? "- " + Math.abs(z) + "z" : "+ " + z + "z") : "";
      res = res != 0 ? res : "";

      e2.innerHTML = `
        ${x}
        ${y}
        ${z} = ${res}`;
      break;
    }
    case "r3_x":
    case "r3_y":
    case "r3_z":
    case "r3_res": {
      let x = document.getElementById("r3_x").value;
      let y = document.getElementById("r3_y").value;
      let z = document.getElementById("r3_z").value;
      let res = document.getElementById("r3_res").value;

      x = x != 0 ? x + "x" : "";
      y = y != 0 ? (y < 0 ? "- " + Math.abs(y) + "y" : "+ " + y + "y") : "";
      z = z != 0 ? (z < 0 ? "- " + Math.abs(z) + "z" : "+ " + z + "z") : "";
      res = res != 0 ? res : "";

      e3.innerHTML = `
        ${x}
        ${y}
        ${z} = ${res}`;
      break;
    }
  }
};

GaussJordan(matrix);
