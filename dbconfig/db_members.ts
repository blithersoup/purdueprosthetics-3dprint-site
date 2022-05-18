import { query } from './dbconfig';
import { Member } from './models';
import { QueryResult } from 'pg';

// get_member
// get_all_members
// create_member
// update_member
// delete_member

export const get_member = async (id: string): Promise<Member | null> => {
  const res = await query<Member>('SELECT * FROM Members WHERE id=$1', [
    id,
  ]);
  return res.rowCount === 1 ? res.rows[0] : null;
};

export const get_all_members = async (): Promise<Member[]> => {
  const res = await query<Member>('SELECT * FROM Members', []);
  return res.rows;
};

export const create_member = async (
  params: Member
): Promise<Member | null> => {
  let res: QueryResult<Member>;
  try {
    res = await query<Member>(
      'INSERT INTO Members (name, email, password, org) VALUES ($1, $2, $3, $4) RETURNING *;',
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

export const update_member = async (
  params: Member
): Promise<Member | null> => {
  const res = await query<Member>(
    'UPDATE Members SET name = $2, password = $3, org = $4 WHERE id = $1 RETURNING *;',
    [
        params.id,
        params.name, 
        params.password,
        params.org
    ]
  );
  return res.rowCount === 1 ? res.rows[0] : null;
};

export const delete_member = async (id: string): Promise<Member | null> => {
  const res = await query<Member>(
    'DELETE FROM Members WHERE id = $1 RETURNING *;',
    [id]
  );
  return res.rowCount === 1 ? res.rows[0] : null;
};
