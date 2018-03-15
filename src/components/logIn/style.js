import styled from 'styled-components';

export const LogInWrap = styled.div`
	width: 560px;
	margin: 0 auto;
	border-radius: 20px;
`;


//Header

export const LogInHeader = styled.div`
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

export const LogInFormTitle = styled.div`
  text-align: center;
  vertical-align: top;
  margin: 10px;
  color: wheat;
`


//Content

export const LogInContent = styled.div`
	background: #1f1e23;
	border-bottom: 1px solid #2d2f32;
	border-top: 1px solid #2d2f32;
	box-shadow: 0px 1px 0px #000;
	padding: 37px;
`;

export const LogInButttonWrap = styled.div`
  display: inline-block;
`;

export const LogInButton = styled.div`
  display: inline-block;
  width: 100%;
`;


//Footer

export const LogInFooter = styled.div`
	background:#242328;
	border-top:1px solid #2d2f32;
  border-radius: 0 0 10px 10px;
	float:left;
	padding:12px 0;
	width:100%;
	height: 17%
`;

export const LogInFooterText = styled.div`
	float:left;
	padding:15px 0 0 6%;
	width:56%;
	p {
		color:#586069;
	}
`;

export const LogInFooterLinks = styled.div`
	float:left;
	width:38%;
	border-radius: 0 0 10px 0;
`;

export const LoginLinksWrap = styled.div`
	float: right;
`;

export const FacebookLink = styled.a`
  @include transition(.4s);
	display: block;
  width: 85px;
  height: 55px;
  background: url(../../img/facebook.png) no-repeat center;
  border-radius: 10px;
	&:hover {
		background-color:#2d2f32;
		cursor:pointer;
	}
	background: url("../../img/facebook.png") no-repeat center;
  border-radius: 10px;
`;


