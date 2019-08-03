const dates = [
  new Date(2019, 8, 1, 12, 0, 0),
  new Date(2019, 8, 2, 18, 30, 0),
  new Date(2019, 8, 2, 8, 0, 0)
]

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        {
          id: 1, 
          user_id: 2, 
          caption: 'work for alex', 
          description: 'do the css work', 
          due_date: dates[0], 
          completed: false, 
          deleted: false 
        },
        {
          id: 2, 
          user_id: 3, 
          caption: 'work for matt', 
          description: 'play pool', 
          due_date: dates[1], 
          completed: false, 
          deleted: false 
        },
        {
          id: 3, 
          user_id: 1, 
          caption: 'work for ropeks', 
          description: 'do the project', 
          due_date: dates[2], 
          completed: false, 
          deleted: false 
        }
      ]);
    });
};