import { fk, many, attr, Model } from 'redux-orm';

export class ActiveWorkout extends Model {

}
ActiveWorkout.modelName = 'ActiveWorkout';
ActiveWorkout.fields = {
  id: fk('Program'),
  day: fk,
  title: fk,
  activeExercise: fk
};

export class ActiveSet extends Model {
  static get modelName() {
    return 'ActiveSet';
  }
  static get fields() {
    return {
      id: attr(),
      exercise: fk('ActiveExercise'),
      weight: attr(),
      reps: attr(),
      type: attr(),
      complete: attr()
    };
  }
}
ActiveSet.modelName = 'ActiveSet';



