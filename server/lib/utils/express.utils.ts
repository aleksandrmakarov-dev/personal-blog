import { Response, Request } from "express";

function Ok(res: Response, data: any) {
  return res.status(200).json(data);
}

function Created(res: Response, data: any) {
  return res.status(201).json(data);
}

function NoContent(res: Response) {
  res.status(204).end();
}

function Message(
  res: Response,
  title: string,
  message: string,
  status: number
) {
  return res.status(status).json({ title, message });
}

export { Ok, Created, NoContent, Message };
