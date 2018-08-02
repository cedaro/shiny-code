import { apiRequest, data } from 'wp';

const { registerStore, dispatch } = data;

const DEFAULT_STATE = {
	highlightColor: '',
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

		if ( action.type === 'SET_HIGHLIGHT_COLOR' ) {
			return {
				...state,
				highlightColor: action.highlightColor
			}
		}

		return state;
	},
	selectors: {
		getHighlightColor( state ) {
			const { highlightColor } = state;
			return highlightColor;
		},
		getTheme( state ) {
			const { theme } = state;
			return theme;
		},
	},
	actions: {
		setHighlightColor( color ) {
			return {
				type: 'SET_HIGHLIGHT_COLOR',
				highlightColor: color
			};
		},
		updateHighlightColor( color ) {
			apiRequest( {
				path: '/wp/v2/settings',
				method: 'POST',
				data: {
					cedaro_code_highlight_color: color || ''
				}
			} ).then( response => {
				dispatch( 'cedaro/code' ).setHighlightColor( response.cedaro_code_highlight_color );
			} );

			return {
				type: 'SET_HIGHLIGHT_COLOR',
				highlightColor: color
			};
		},
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
		},
	},
	resolvers: {
		async getHighlightColor() {
			const settings = await apiRequest( { path: '/wp/v2/settings' } );
			const { cedaro_code_highlight_color } = settings;
			dispatch( 'cedaro/code' ).setHighlightColor( cedaro_code_highlight_color );
		},
		async getTheme() {
			const settings = await apiRequest( { path: '/wp/v2/settings' } );
			const { cedaro_code_theme } = settings;
			dispatch( 'cedaro/code' ).setTheme( cedaro_code_theme );
		},
	}
} );
