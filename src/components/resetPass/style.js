import styled from 'styled-components';

export const Wrap = styled.div`
	width: 560px;
	margin: 0 auto;
	border-radius: 20px;
`;


//Header

export const Header = styled.div`
	background: #242328;
	border-bottom: 1px solid #2d2f32;
	border-radius: 10px 10px 0 0;
	box-shadow: 0px 1px 0px #000;
	padding: 0px;
	p {
		color: #586069;
		text-align: center;
	}
	height: 10%;
	width: inherit;
	display: inline-block;
`;

export const Title = styled.div`
  text-align: center;
  vertical-align: top;
  margin: 10px;
  color: wheat;
`


//Content

export const Content = styled.div`
	background: #1f1e23;
	border-bottom: 1px solid #2d2f32;
	border-top: 1px solid #2d2f32;
	box-shadow: 0px 1px 0px #000;
	padding: 37px;
`;


export const LinksWrap = styled.div`
	float: right;
`;

export const ChangePassButtonWrap = styled.div`
  display: inline-block;
`;

export const ChangePassButton = styled.div`
  display: inline-block;
  width: 100%;
  line-height: 3em;
`;
