import type { Schema } from 'express-validator';

const id: Schema = {
    id: { isInt: { options: { min: 0, allow_leading_zeroes: false } } },
};

export { id };