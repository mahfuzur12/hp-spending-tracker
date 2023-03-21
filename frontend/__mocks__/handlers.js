import { rest } from 'msw';

export const handlers = [
    rest.post('/signin', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                message: 'Login successful',
            })
        );
    }),
];
