import Album from './albumRepository';
import crud from '../lib/crud';

export default crud(Album, ['GET', 'POST']);
