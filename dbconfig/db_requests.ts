import { query } from './dbconfig';
import { Request } from './models';
import { QueryResult } from 'pg';

// get_requests
// get_requests_by_member
// get_all_requests
// create_request
// update_request
// delete_request

export const get_request = async (id: string): Promise<Request | null> => {
  const res = await query<Request>('SELECT * FROM Requests WHERE id=$1', [
    id,
  ]);
  return res.rowCount === 1 ? res.rows[0] : null;
};

export const get_requests_by_member = async (
  id: string
): Promise<Request[] | null> => {
  const res = await query<Request>(
    'SELECT * FROM Requests WHERE author_id=$1',
    [id]
  );
  return res.rows;
};

export const get_all_requests = async (): Promise<Request[]> => {
  const res = await query<Request>('SELECT * FROM Requests', []);
  return res.rows;
};

export const create_request = async (
  params: Request
): Promise<Request | null> => {
  let res: QueryResult<Request>;
  try {
    res = await query<Request>(
      'INSERT INTO Requests (id, name, author_id, url, dimensions, notes, material_type, second_material, stage) VALUES (default, $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;',
      [params.name, params.author_id, params.url, params.dimensions, params.notes, params.material_type, params.second_material, params.stage]
    );
  } catch (err: any) {
    //if username is already taken
    if (err.code === '23505') {
      return null;
    } else {
      throw err;
    }
  }

  return res.rows[0];
};

export const update_request = async (
  params: Request
): Promise<Request | null> => {
  const res = await query<Request>(
    'UPDATE Requests SET name = $2, author_id = $3, url = $4, dimensions = $5, notes = $6, material_type = $7, second_material = $8, stage = $9 WHERE id = $1 RETURNING *;',
    [
        params.id,
        params.name, 
        params.author_id, 
        params.url, 
        params.dimensions, 
        params.notes, 
        params.material_type, 
        params.second_material, 
        params.stage
    ]
  );
  return res.rowCount === 1 ? res.rows[0] : null;
};

export const delete_request = async (id: string): Promise<Request | null> => {
  const res = await query<Request>(
    'DELETE FROM Requests WHERE id = $1 RETURNING *;',
    [id]
  );
  return res.rowCount === 1 ? res.rows[0] : null;
};
