import { apiRequest, data } from 'wp';

const { registerStore, dispatch } = data;

const DEFAULT_STATE = {
	theme: ''
};

registerStore( 'cedaro/code', {
	reducer( state = DEFAULT_STATE, action ) {
		if ( action.type === 'SET_THEME' ) {
			return {
				...state,
				theme: action.theme
			}
		}

		return state;
	},
	selectors: {
		getTheme( state ) {
			const { theme } = state;
			return theme;
		}
	},
	actions: {
		setTheme( theme ) {
			return {
				type: 'SET_THEME',
				theme: theme
			};
		},
		updateTheme( theme ) {
			apiRequest( {
				path: '/wp/v2/settings',
				method: 'POST',
				data: {
					cedaro_code_theme: theme
				}
			} ).then( response => {
				dispatch( 'cedaro/code' ).setTheme( response.cedaro_code_theme );
			} );

			return {
				type: 'SET_THEME',
				theme: theme
			};
		}
	},
	resolvers: {
		async getTheme() {
			const settings = await apiRequest( { path: '/wp/v2/settings' } );
			const { cedaro_code_theme } = settings;
			dispatch( 'cedaro/code' ).setTheme( cedaro_code_theme );
		}
	}
} );
