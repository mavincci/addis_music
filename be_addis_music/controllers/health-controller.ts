import type { Request, Response } from 'express'

function checkHealth(req: Request, res: Response): void {
  console.log('HEALTH: check')
  res.status(200).json({
    timestamp: new Date().toISOString(),
    isError: false,
    message: 'RUNNING',
    data: undefined,
  })
}

function healthPing(req: Request, res: Response): void {
  console.log('HEALTH: check')
  res.status(200).json({
    timestamp: new Date().toISOString(),
    isError: false,
    message: 'PONG',
    data: undefined,
  })
}

export { checkHealth, healthPing }
