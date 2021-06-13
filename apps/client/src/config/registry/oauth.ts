import Constants from 'expo-constants';
import { container } from 'tsyringe';

container.registerInstance('oauth.github', Constants.manifest.web?.config?.oauth.github);
