import style from "./errorboundry.module.css";
import { useRouter } from "next/router";

const Contant =()=>{
    const router = useRouter();

    return(
        <div className={style.errorBoundryContainer}>
            <div className={style.darkHeading}>Oops, it seems something went wrong</div>
            <img
                src='/images/ErrorPage.svg'
                alt=''
            />
            <div className={style.lightText}>Try reloading page or we can take you home if the problem still exists</div>
            <div className={style.buttonGroup}>
                <button
                    type="button"
                    className={`${style.reloadBtn}`}
                    onClick={() => {
                        window.location.reload();
                        // this.setState({ hasError: false })
                    }}
                >
                    Reload Page
                </button>
                <button
                    type="button"
                    className={`${style.homeBtn}`}
                    onClick={()=>{
                        router.push({
                            pathname: "/",
                        });
                    }}
                >
                    Take me Home
                </button>
            </div>
        </div>
    )
}

export default Contant;