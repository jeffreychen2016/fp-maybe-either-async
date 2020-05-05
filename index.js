const {
  tap,
  Async,
  compose,
  find,
  maybeToEither,
  chain,
  eitherToAsync,
} = require("crocks");

const log = (label) => (x) => console.log(`${label}: ${x}`);

const deleteStudentById = (eitherStudent) => {
  // console.log(eitherStudent)
  return Async((rej, res) => {
    setTimeout(() => {
      res("student is deleted");
      // rej('could not delete student')
    }, 1000);
  });
};

const createDeletedStudent = (eitherStudent) => {
  // console.log(eitherStudent)
  return Async((rej, res) => {
    setTimeout(() => {
      res("student is created");
      // rej('could not create student')
    }, 1000);
  });
};

const isThirdGrade = (student) => student.grade === 3;

const findStudentIdByName = (students) => {
  // Just student || Nothing
  const maybeStudent = find(isThirdGrade, students);
  // console.log(maybeStudent.inspect())

  // Left 'No matching record' || Right student
  const eitherStudent = maybeToEither("No matching record", maybeStudent);
  // console.log(eitherStudent.inspect())

  return eitherStudent;
};

const workflow = compose(
  // tap((x) => console.log(x.inspect())),
  chain(createDeletedStudent),
  chain(deleteStudentById),
  // convert either to async for chaining with Async deleteStudentById
  eitherToAsync(findStudentIdByName)
);

workflow([
  { id: 1, firstName: "Jeffrey", lastName: "Chen", grade: 10 },
  { id: 2, firstName: "Kevin", lastName: "Chen", grade: 3 },
]).fork(log("rej"), log("res"));
