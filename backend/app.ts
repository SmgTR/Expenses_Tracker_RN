import 'dotenv/config';

import createServer from '@/utils/server';

const app = createServer();

app.listen(3000);
