import { query } from './dbconfig';
import { Manager } from './models';
import { QueryResult } from 'pg';

// get_manager
// get_all_managers
// create_manager
// update_manager
// delete_manager

export const get_manager = async (id: string): Promise<Manager | null> => {
  const res = await query<Manager>('SELECT * FROM Managers WHERE id=$1', [
    id,
  ]);
  return res.rowCount === 1 ? res.rows[0] : null;
};

export const get_all_managers = async (): Promise<Manager[]> => {
  const res = await query<Manager>('SELECT * FROM Managers', []);
  return res.rows;
};

export const create_manager = async (
  params: Manager
): Promise<Manager | null> => {
  let res: QueryResult<Manager>;
  try {
    res = await query<Manager>(
      'INSERT INTO Managers (id, name, email, password, org) VALUES (default, $1, $2, $3, $4) RETURNING *;',
      [params.name, params.email, params.password, params.org]
    );
  } catch (err: any) {
    // username is already taken
    if (err.code === '23505') {
      return null;
    } else {
      throw err;
    }
  }

  return res.rows[0];
};

export const update_manager = async (
  params: Manager
): Promise<Manager | null> => {
  const res = await query<Manager>(
    'UPDATE Managers SET name = $2, password = $3, org = $4 WHERE id = $1 RETURNING *;',
    [
        params.id,
        params.name, 
        params.password,
        params.org
    ]
  );
  return res.rowCount === 1 ? res.rows[0] : null;
};

export const delete_manager = async (id: string): Promise<Manager | null> => {
  const res = await query<Manager>(
    'DELETE FROM Managers WHERE id = $1 RETURNING *;',
    [id]
  );
  return res.rowCount === 1 ? res.rows[0] : null;
};
