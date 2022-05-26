import { query } from "./dbconfig";
import { Member } from "./models";
import { QueryResult } from "pg";

// get_member
// get_all_members
// create_member
// update_member
// delete_member
// is_admin
// get_id_from_email

export const get_member = async (id: string): Promise<Member | null> => {
  const res = await query<Member>("SELECT * FROM Members WHERE id=$1", [id]);
  return res.rowCount === 1 ? res.rows[0] : null;
};

export const get_all_members = async (): Promise<Member[]> => {
  const res = await query<Member>("SELECT * FROM Members", []);
  return res.rows;
};

export const create_member = async (params: Member): Promise<Member | null> => {
  let res: QueryResult<Member>;
  try {
    res = await query<Member>(
      "INSERT INTO Members (email) VALUES ($1) RETURNING *;",
      [params.email]
    );
  } catch (err: any) {
    // username is already taken
    if (err.code === "23505") {
      return null;
    } else {
      throw err;
    }
  }

  return res.rows[0];
};

export const update_member = async (params: Member): Promise<Member | null> => {
  const res = await query<Member>(
    "UPDATE Members SET email = $2 WHERE id = $1 RETURNING *;",
    [params.id, params.email]
  );
  return res.rowCount === 1 ? res.rows[0] : null;
};

export const delete_member = async (id: string): Promise<Member | null> => {
  const res0 = await query<Request>(
    "DELETE FROM Requests WHERE author_id = $1 RETURNING *;",
    [id]
  );
  if (res0.rowCount < 0) {
    throw new Error(`Error: ${res0}`);
  }
  const res = await query<Member>(
    "DELETE FROM Members WHERE id = $1 RETURNING *;",
    [id]
  );
  return res.rowCount === 1 ? res.rows[0] : null;
};

export const is_admin = async (id: string): Promise<boolean> => {
  const res = await query<string>("SELECT * FROM AdminMembers WHERE email=$1;", [
    id,
  ]);
  return res.rowCount === 1 ? true : false;
};

export const get_id_from_email = async (
  email: string
): Promise<string | null> => {
  const res = await query<string>("SELECT id FROM Members WHERE email=$1;", [
    email,
  ]);
  return res.rowCount >= 1 ? res.rows[0] : null;
};
