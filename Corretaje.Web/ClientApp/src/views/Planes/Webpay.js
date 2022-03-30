import React, { useState, useEffect } from "react";
import api from "../../api";
import utilfunc from "../../utils/utilsFunc";
import { LoadingModal } from "../../components/Loading";

const { getUrlParameter } = utilfunc;

export const Webpay = props => {
  const { data, loading } = props;

  const [token, setToken] = useState(null);
  const [url, setUrl] = useState(null);
  // const [src, setSrc] = useState("");
  let iframe;

  useEffect(() => {
    console.log("window: ", window.location);
    iframe && handleGoBack();
  });

  useEffect(() => {
    if (!token && !url) {
      setData();
    }
  });

  const setData = async () => {
    const res = await api.apiGetPayment(data);
    const {
      data: { token, url },
    } = res;
    setToken(token);
    setUrl(url);
  };

  const handleGoBack = () => {
    // const links = iframe.contentWindow.document.getElementsByTagName("a");
    // console.log("links: ", links);
  };

  return (
    <React.Fragment>
      {loading && <LoadingModal />}
      {token && url && (
        <iframe
          ref={i => (iframe = i)}
          className="center-cont"
          title="pay-form"
          src={`/webpay?url=${url}&token=${token}`}
          // onLoad={e => setSrc(e.target.src)}
        />
      )}
    </React.Fragment>
  );
};

const WebpayView = props => {
  const url = getUrlParameter("url");
  const token = getUrlParameter("token");
  let form = null;

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted && form) {
      window.open('', 'TheWindow');
      form.submit();
      setSubmitted(true);
    }
  });

  return (
    <form
      action={url}
      ref={input => {
        form = input;
      }}
    >
      <input type="hidden" name="token_ws" value={token} />
      <p>Cargando Webpay...</p>
    </form>
  );
};

export default WebpayView;
