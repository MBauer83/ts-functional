/* eslint-disable max-nested-callbacks */
import {type Either, Right} from './Either';
import {type Monad} from './Monad';

export class Task<Error, Output> implements Monad<Output> {
	constructor(public readonly evaluate: (_: any) => Either<Error, Output>) {}

	map<Output2>(f: (output: Output) => Output2): Task<Error, Output2> {
		return new Task<Error, Output2>(input => this.evaluate(input).map(o => f(o)));
	}

	apply<Output2>(f: Task<Error, (x: Output) => Output2>): Task<Error, Output2> {
		return f.flatMap(g => this.map(g));
	}

	pure<Output2>(x: Output2): Task<Error, Output2> {
		return new Task<Error, Output2>(() => new Right<Error, Output2>(x));
	}

	flatMap<Output2>(f: (x: Output) => Task<Error, Output2>): Task<Error, Output2> {
		return new Task<Error, Output2>(input => this.evaluate(input).flatMap(o => f(o).evaluate(input)));
	}

	zip<Output2>(other: Task<Error, Output2>): Task<Error, [Output, Output2]> {
		const evaluate = (input: any): Either<Error, [Output, Output2]> => {
			const output = this.evaluate(input);
			const output2 = other.evaluate(input);

			return output.flatMap(o => output2.map(o2 => [o, o2]));
		};

		return new Task<Error, [Output, Output2]>(evaluate);
	}

	zipWithNewError<Error2, Output2>(
		other: Task<Error2, Output2>,
	): Task<Error | Error2, [Output, Output2]> {
		const evaluate = (input: any): Either<Error | Error2, [Output, Output2]> => {
			const output = this.evaluate(input);
			const output2 = other.evaluate(input);

			return output.flatMap(o => output2.map(o2 => [o, o2]));
		};

		return new Task<Error | Error2, [Output, Output2]>(evaluate);
	}

	zip2<Output2, Output3>(
		o2: Task<Error, Output2>,
		o3: Task<Error, Output3>,
	): Task<Error, [Output, Output2, Output3]> {
		const evaluate = (input: any): Either<Error, [Output, Output2, Output3]> => {
			const output = this.evaluate(input);
			const output2 = o2.evaluate(input);
			const output3 = o3.evaluate(input);

			return output.flatMap(o => output2.flatMap(o2 => output3.map(o3 => [o, o2, o3])));
		};

		return new Task<Error, [Output, Output2, Output3]>(evaluate);
	}

	zip2WithNewErrors<
		Error2,
		Error3,
		Output2,
		Output3>(
		o2: Task<Error2, Output2>,
		o3: Task<Error3, Output3>,
	): Task<Error | Error2 | Error3, [Output, Output2, Output3]> {
		const evaluate = (input: any): Either<Error | Error2 | Error3, [Output, Output2, Output3]> => {
			const output = this.evaluate(input);
			const output2 = o2.evaluate(input);
			const output3 = o3.evaluate(input);

			return output.flatMap(o => output2.flatMap(o2 => output3.map(o3 => [o, o2, o3])));
		};

		return new Task<Error | Error2 | Error3, [Output, Output2, Output3]>(evaluate);
	}

	zip3<Output2, Output3, Output4>(
		o2: Task<Error, Output2>,
		o3: Task<Error, Output3>,
		o4: Task<Error, Output4>,
	): Task<Error, [Output, Output2, Output3, Output4]> {
		const evaluate = (input: any): Either<Error, [Output, Output2, Output3, Output4]> => {
			const output = this.evaluate(input);
			const output2 = o2.evaluate(input);
			const output3 = o3.evaluate(input);
			const output4 = o4.evaluate(input);

			return output.flatMap(o => output2.flatMap(o2 => output3.flatMap(o3 => output4.map(o4 => [o, o2, o3, o4]))));
		};

		return new Task<Error, [Output, Output2, Output3, Output4]>(evaluate);
	}

	zip3WithNewErrors<
		Error2,
		Error3,
		Error4,
		Output2,
		Output3,
		Output4>(
		o2: Task<Error2, Output2>,
		o3: Task<Error3, Output3>,
		o4: Task<Error4, Output4>,
	): Task<Error | Error2 | Error3 | Error4, [Output, Output2, Output3, Output4]> {
		const evaluate = (input: any): Either<Error | Error2 | Error3 | Error4, [Output, Output2, Output3, Output4]> => {
			const output = this.evaluate(input);
			const output2 = o2.evaluate(input);
			const output3 = o3.evaluate(input);
			const output4 = o4.evaluate(input);

			return output.flatMap(o => output2.flatMap(o2 => output3.flatMap(o3 => output4.map(o4 => [o, o2, o3, o4]))));
		};

		return new Task<Error | Error2 | Error3 | Error4, [Output, Output2, Output3, Output4]>(evaluate);
	}

	zip4<Output2, Output3, Output4, Output5>(
		o2: Task<Error, Output2>,
		o3: Task<Error, Output3>,
		o4: Task<Error, Output4>,
		o5: Task<Error, Output5>,
	): Task<Error, [Output, Output2, Output3, Output4, Output5]> {
		const evaluate = (input: any): Either<Error, [Output, Output2, Output3, Output4, Output5]> => {
			const output = this.evaluate(input);
			const output2 = o2.evaluate(input);
			const output3 = o3.evaluate(input);
			const output4 = o4.evaluate(input);
			const output5 = o5.evaluate(input);

			return output.flatMap(
				o => output2.flatMap(
					o2 => output3.flatMap(
						o3 => output4.flatMap(
							o4 => output5.map(
								o5 => [o, o2, o3, o4, o5],
							),
						),
					),
				),
			);
		};

		return new Task<Error, [Output, Output2, Output3, Output4, Output5]>(evaluate);
	}

	zip4WithNewErrors<
		Error2,
		Error3,
		Error4,
		Error5,
		Output2,
		Output3,
		Output4,
		Output5>(
		o2: Task<Error2, Output2>,
		o3: Task<Error3, Output3>,
		o4: Task<Error4, Output4>,
		o5: Task<Error5, Output5>,
	): Task<Error | Error2 | Error3 | Error4 | Error5, [Output, Output2, Output3, Output4, Output5]> {
		const evaluate = (input: any): Either<Error | Error2 | Error3 | Error4 | Error5, [Output, Output2, Output3, Output4, Output5]> => {
			const output = this.evaluate(input);
			const output2 = o2.evaluate(input);
			const output3 = o3.evaluate(input);
			const output4 = o4.evaluate(input);
			const output5 = o5.evaluate(input);

			return output.flatMap(
				o => output2.flatMap(
					o2 => output3.flatMap(
						o3 => output4.flatMap(
							o4 => output5.map(
								o5 => [o, o2, o3, o4, o5],
							),
						),
					),
				),
			);
		};

		return new Task<Error | Error2 | Error3 | Error4 | Error5, [Output, Output2, Output3, Output4, Output5]>(evaluate);
	}

	zip5<Output2, Output3, Output4, Output5, Output6>(
		o2: Task<Error, Output2>,
		o3: Task<Error, Output3>,
		o4: Task<Error, Output4>,
		o5: Task<Error, Output5>,
		o6: Task<Error, Output6>,
	): Task<Error, [Output, Output2, Output3, Output4, Output5, Output6]> {
		const evaluate = (input: any): Either<Error, [Output, Output2, Output3, Output4, Output5, Output6]> => {
			const output = this.evaluate(input);
			const output2 = o2.evaluate(input);
			const output3 = o3.evaluate(input);
			const output4 = o4.evaluate(input);
			const output5 = o5.evaluate(input);
			const output6 = o6.evaluate(input);

			return output.flatMap(
				o => output2.flatMap(
					o2 => output3.flatMap(
						o3 => output4.flatMap(
							o4 => output5.flatMap(
								o5 => output6.map(
									o6 => [o, o2, o3, o4, o5, o6],
								),
							),
						),
					),
				),
			);
		};

		return new Task<Error, [Output, Output2, Output3, Output4, Output5, Output6]>(evaluate);
	}

	zip5WithNewErrors<
		Error2,
		Error3,
		Error4,
		Error5,
		Error6,
		Output2,
		Output3,
		Output4,
		Output5,
		Output6>(
		o2: Task<Error2, Output2>,
		o3: Task<Error3, Output3>,
		o4: Task<Error4, Output4>,
		o5: Task<Error5, Output5>,
		o6: Task<Error6, Output6>,
	): Task<Error | Error2 | Error3 | Error4 | Error5 | Error6, [Output, Output2, Output3, Output4, Output5, Output6]> {
		const evaluate = (input: any): Either<Error | Error2 | Error3 | Error4 | Error5 | Error6, [Output, Output2, Output3, Output4, Output5, Output6]> => {
			const output = this.evaluate(input);
			const output2 = o2.evaluate(input);
			const output3 = o3.evaluate(input);
			const output4 = o4.evaluate(input);
			const output5 = o5.evaluate(input);
			const output6 = o6.evaluate(input);

			return output.flatMap(
				o => output2.flatMap(
					o2 => output3.flatMap(
						o3 => output4.flatMap(
							o4 => output5.flatMap(
								o5 => output6.map(
									o6 => [o, o2, o3, o4, o5, o6],
								),
							),
						),
					),
				),
			);
		};

		return new Task<Error | Error2 | Error3 | Error4 | Error5 | Error6, [Output, Output2, Output3, Output4, Output5, Output6]>(evaluate);
	}

	zip6<Output2, Output3, Output4, Output5, Output6, Output7>(
		o2: Task<Error, Output2>,
		o3: Task<Error, Output3>,
		o4: Task<Error, Output4>,
		o5: Task<Error, Output5>,
		o6: Task<Error, Output6>,
		o7: Task<Error, Output7>,
	): Task<Error, [Output, Output2, Output3, Output4, Output5, Output6, Output7]> {
		const evaluate = (input: any): Either<Error, [Output, Output2, Output3, Output4, Output5, Output6, Output7]> => {
			const output = this.evaluate(input);
			const output2 = o2.evaluate(input);
			const output3 = o3.evaluate(input);
			const output4 = o4.evaluate(input);
			const output5 = o5.evaluate(input);
			const output6 = o6.evaluate(input);
			const output7 = o7.evaluate(input);

			return output.flatMap(
				o => output2.flatMap(
					o2 => output3.flatMap(
						o3 => output4.flatMap(
							o4 => output5.flatMap(
								o5 => output6.flatMap(
									o6 => output7.map(
										o7 => [o, o2, o3, o4, o5, o6, o7],
									),
								),
							),
						),
					),
				),
			);
		};

		return new Task<Error, [Output, Output2, Output3, Output4, Output5, Output6, Output7]>(evaluate);
	}

	zip6WithNewErrors<
		Error2,
		Error3,
		Error4,
		Error5,
		Error6,
		Error7,
		Output2,
		Output3,
		Output4,
		Output5,
		Output6,
		Output7>(
		o2: Task<Error2, Output2>,
		o3: Task<Error3, Output3>,
		o4: Task<Error4, Output4>,
		o5: Task<Error5, Output5>,
		o6: Task<Error6, Output6>,
		o7: Task<Error7, Output7>,
	): Task<Error | Error2 | Error3 | Error4 | Error5 | Error6 | Error7, [Output, Output2, Output3, Output4, Output5, Output6, Output7]> {
		const evaluate = (input: any): Either<Error | Error2 | Error3 | Error4 | Error5 | Error6 | Error7, [Output, Output2, Output3, Output4, Output5, Output6, Output7]> => {
			const output = this.evaluate(input);
			const output2 = o2.evaluate(input);
			const output3 = o3.evaluate(input);
			const output4 = o4.evaluate(input);
			const output5 = o5.evaluate(input);
			const output6 = o6.evaluate(input);
			const output7 = o7.evaluate(input);

			return output.flatMap(
				o => output2.flatMap(
					o2 => output3.flatMap(
						o3 => output4.flatMap(
							o4 => output5.flatMap(
								o5 => output6.flatMap(
									o6 => output7.map(
										o7 => [o, o2, o3, o4, o5, o6, o7],
									),
								),
							),
						),
					),
				),
			);
		};

		return new Task<Error | Error2 | Error3 | Error4 | Error5 | Error6 | Error7, [Output, Output2, Output3, Output4, Output5, Output6, Output7]>(evaluate);
	}
}