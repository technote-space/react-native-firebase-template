import { container } from 'tsyringe';
import Constants from 'expo-constants';

container.registerInstance('oauth.github', Constants.manifest.web?.config?.oauth.github);
