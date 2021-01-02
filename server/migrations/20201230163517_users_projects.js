
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users_projects', function(table) {
      table.increments('project_id').primary();
      table.integer('users_id');
      table.string('project_img_url');
      table.string('project_title');
      table.string('project_summary');
      table.string('project_url');
    });    
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_projects')
};
