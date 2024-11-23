import { element, i18n } from 'wp';
import { getLanguageSettings } from './settings';

const { Component } = element;
const { __, sprintf } = i18n;
const noop = () => {};

export default class CodeEditor extends Component {
	constructor() {
		super( ...arguments );

		this.highlightLines = this.highlightLines.bind( this );
		this.updateLanguageSettings = this.updateLanguageSettings.bind( this );
	}

	componentDidMount() {
		const { language, firstLineNumber, highlightLines, showLineNumbers, theme } = this.props;

		const editor = wp.codeEditor.initialize( this.textarea, {
			codemirror: {
				continueComments: true,
				direction: 'ltr',
				firstLineNumber: firstLineNumber,
				gutters: [ 'CodeMirror-lint-markers' ],
				indentUnit: 4,
				indentWithTabs: true,
				inputStyle: 'contenteditable',
				lineNumbers: showLineNumbers,
				lineWrapping: false,
				mode: language || null,
				styleActiveLine: true,
				theme: theme,
				viewportMargin: Infinity,
			}
		} );

		editor.codemirror.on( 'change', () => {
			this.props.onChange( editor.codemirror.getValue() );
		} );

		editor.codemirror.on( 'gutterClick', ( doc, line ) => {
			this.props.onLineNumberClick( line );
		} );

		this.editor = editor;
		this.highlightLines( highlightLines );
		this.updateLanguageSettings( language );
	}

	componentDidUpdate( prevProps, prevState ) {
		if ( this.props.language !== prevProps.language ) {
			this.updateLanguageSettings( this.props.language );
		}

		if ( this.props.highlightLines !== prevProps.highlightLines ) {
			this.highlightLines( this.props.highlightLines, prevProps.highlightLines );
		}

		this.editor.codemirror.setOption( 'firstLineNumber', this.props.firstLineNumber );
		this.editor.codemirror.setOption( 'lineNumbers', this.props.showLineNumbers );
		this.editor.codemirror.setOption( 'theme', this.props.theme );
	}

	componentWillUnmount() {
		this.editor.codemirror.toTextArea();
	}

	highlightLines( lines, prevLines = [] ) {
		const doc = this.editor.codemirror;
		const className = 'CodeMirror-linebackground-highlight';
		const arrayDifference = ( array1, array2 ) => array1.filter( value => ! array2.includes( value ) );

		lines.forEach( line => doc.addLineClass( line, 'background', className ) );
		arrayDifference( prevLines, lines ).forEach( line => doc.removeLineClass( line, 'background', className ) );
	}

	updateLanguageSettings( value ) {
		const settings = getLanguageSettings( value );

		this.editor.codemirror.setOption( 'mode', value );

		Object.keys( settings ).forEach( key => {
			this.editor.codemirror.setOption( key, settings[ key ] );
		});
	}

	render() {
		return (
			<textarea
				ref={ el => this.textarea = el }
				placeholder={ __( 'Write code…', 'shiny-code' ) }
				defaultValue={ this.props.content }
			/>
		);
	}
}
