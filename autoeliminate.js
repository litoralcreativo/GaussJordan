const stepForward = (target, pivot, column) => {
  if (target <= 0 || pivot <= 0 || column <= 0) return;

  const r_target = target;
  const r_pivot = pivot;

  const t = matrix[r_target - 1][column - 1];
  const p = matrix[r_pivot - 1][column - 1];

  if (t == 0 || p == 0) {
    console.log("target: " + t);
    console.log(target + " - " + column);
    console.log("pivot: " + p);
    console.log(pivot + " - " + column);
    return;
  }
  console.log(contador + 1);

  const tp_mcm = mcm([t, p]);
  const t_coef = Math.abs(tp_mcm / t);
  const p_coef = Math.abs(tp_mcm / p);
  const sign =
    Math.sign(t) + Math.sign(p) == 2 || Math.sign(t) + Math.sign(p) == -2
      ? -1
      : 1;

  matrix = SumAndProd(
    matrix,
    r_target,
    t_coef * sign,
    r_pivot,
    p_coef,
    r_target
  );
};

const mcm = (numbers) => {
  const max = Math.max.apply(null, numbers);
  let fac = 1;
  let found = false;
  while (!found) {
    let match = 0;
    const mul = fac * max;
    numbers.forEach((element) => {
      if (mul % element == 0) match++;
    });
    match == numbers.length ? (found = true) : fac++;
  }
  return fac * max;
};
const mcd = (numbers) => {
  const min = Math.min.apply(null, numbers);
  let div = min;
  let found = false;
  while (!found) {
    let match = 0;
    numbers.forEach((element) => {
      if (element % div == 0) match++;
    });
    match == numbers.length ? (found = true) : div--;
    if (div == 1) break;
  }
  return div;
};

const CheckMatrixSolution = (mat) => {
  let indeterminate = false;
  let incompatible = false;
  let compatible = false;

  let good_eq = 0;
  mat.forEach((element) => {
    let nums = 0;
    for (let i = 0; i < element.length; i++) {
      const n = element[i];
      nums += n != 0 ? 1 : 0;
    }
    if (nums == 0) indeterminate = true;
    if (nums == 1) incompatible = true;
    if (nums == 2) good_eq++;
  });
  if (good_eq == 3) compatible = true;

  return compatible || incompatible || indeterminate;
};

const automate = () => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length - 1; j++) {
      if (i != j && !CheckMatrixSolution(matrix))
        stepForward(j + 1, i + 1, i + 1);
    }
  }
  lastSteps = true;
  if (status != 3) return;
  if (op == "x") document.getElementById("operation-btn").click();
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length - 1; j++) {
      if (i == j) matrix = ScalarProd(matrix, i + 1, matrix[i][j]);
    }
  }
  AddDomMatrix_results(matrix);
};

const AddDomMatrix_results = (mat) => {
  const element = `
    <div class="matrix" style="background-color: blue">
      <div class="titlulo">
      
        <h3>Resultados: </h3>
      </div>
        ${mat
          .map((row, i) => {
            let variable = "x";
            switch (i) {
              case 0:
                variable = "x";
                break;
              case 1:
                variable = "y";
                break;
              case 2:
                variable = "z";
                break;
              case 3:
                variable = "t";
                break;
            }
            return `<h3>${variable} = ${row[row.length - 1]}</h3>`;
          })
          .join("")}
      
    </div>
  `;
  document
    .getElementById("matrices-container")
    .insertAdjacentHTML("beforeend", element);
};
