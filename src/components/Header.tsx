import {
  motion,
  useAnimation,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderBox = styled(motion.nav)`
  position: fixed;
  width: 100%;
  height: 70px;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.4s;
  z-index: 10;
`;

const Column = styled.div`
  margin: 0px 28px;
  display: flex;
`;
const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 100px;
`;

const Menu = styled.ul`
  min-width: 300px;
  display: flex;
  align-items: center;
`;
const Category = styled.li`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  margin-right: 20px;
  color: ${(props) => props.theme.textColor.white};
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.textColor.hover};
    text-shadow: 0px 0px 3px rgba(255, 255, 255, 0.8);
  }
`;

const Search = styled.form`
  display: flex;
  align-items: center;
  position: relative;
`;

const Input = styled(motion.input)`
  transform-origin: right;
  position: absolute;
  width: 200px;
  right: 0px;
  padding: 8px;
  font-size: 16px;
  background-color: transparent;
  color: ${(p) => p.theme.textColor.white};
  border: none;
  border-bottom: 2px solid ${(p) => p.theme.textColor.white};
  caret-color: ${(p) => p.theme.textColor.white};
  &:focus {
    outline: none;
  }
`;
const ISearch = styled(motion.svg)`
  fill: ${(p) => p.theme.textColor.white};
  width: 26px;
  &:hover {
    transition: 0.4s;
    filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.8));
    fill: ${(p) => p.theme.textColor.hover};
  }
`;
const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  top: -12px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
  box-shadow: 0px 0px 4px 2.5px ${(props) => props.theme.red};
  animation: glow 2s 0.8s infinite linear alternate;
  @keyframes glow {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }
`;

const pathVar = {
  initial: {
    fillOpacity: 1,
  },
  hover: {
    fillOpacity: 0,
    trasition: { type: "linear" },
  },
};

interface IForm {
  keyword : string
}

function Header() {
  const [isSearching, setisSearching] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } =useForm<IForm>();
  const onSubmit = ({keyword} : IForm) =>{
    navigate(`/search?keyword=${keyword}`);
  }
  const home = useMatch("/*");
  const tv = useMatch("/tv/*");
  const movie = useMatch("/movie/*");
  const inputAni = useAnimation();
  const toggleSearch = () => {
    if (isSearching) {
      inputAni.start({ scaleX: 0 });
    } else {
      inputAni.start({ scaleX: 1 });
    }
    setisSearching((bool) => !bool);
  };
  const { scrollY } = useViewportScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 300],
    ["rgba(18,18,18,0)", "rgba(18,18,18,0.88)"]
  );

  return (
    <HeaderBox style={{ backgroundColor }}>
      <Column>
        <Logo
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 276.742"
          variants={pathVar}
          initial="initial"
          whileHover="hover"
        >
          <motion.path
            fill="#ff0000"
            d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
          />
        </Logo>
        <Menu>
          <Category>
            <Link to="/">HOME {home && <Circle layoutId="circle" />}</Link>
          </Category>
          <Category>
            <Link to="/tv">TV Shows {tv && <Circle layoutId="circle" />}</Link>
          </Category>
          <Category>
            <Link to="/movie">
              Movies {movie && <Circle layoutId="circle" />}
            </Link>
          </Category>
        </Menu>
      </Column>
      <Column>
        <Search onSubmit={handleSubmit(onSubmit)}>
          <ISearch
            onClick={() => toggleSearch()}
            animate={{ x: isSearching ? -220 : 0 , transition : { type: "tween", duration : 0.6 }}}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
          </ISearch>
          <Input
            {...register("keyword", {required : true})}
            initial={{ scaleX: 0 }}
            animate={inputAni}
            transition={{ type: "linear", duration: 0.6 }}
          />
        </Search>
      </Column>
    </HeaderBox>
  );
}

export default Header;
