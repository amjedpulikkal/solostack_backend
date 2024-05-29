
import { server } from './infrastructure/services/socketIo';
import { dbConnect } from './infrastructure/server/config/db';
import { esClientConnection } from './infrastructure/server/config/elasticsearch';


const port: number | string = process.env.PORT || 3001;


server.listen(port, () => {
    esClientConnection()
    dbConnect()
    .then(() => {
        console.log(`Server running on port ${port}`);
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });
});
