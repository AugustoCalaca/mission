import React, { memo, useCallback, useEffect, useState } from 'react';

import Alert, { IAlertShowParams } from './Alert';

let lastPromise = Promise.resolve(false);
let globalAlert: (params: IAlertShowParams) => Promise<boolean>;

const AlertGlobalProvider = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [params, setParams] = useState<IAlertShowParams>();
  const [promiseResolve, setPromiseResolve] = useState<(result: boolean) => void>();

  const handleShow = useCallback((params: IAlertShowParams): Promise<boolean> => {
    const result = new Promise<boolean>((resolve) => {
      setPromiseResolve(() => resolve);
      setOpened(true);
      setParams({ confirmation: false, title: null, ...params });
    });

    result.then(() => setOpened(false));
    return result;
  }, []);

  const onClose = useCallback(
    (ok: boolean) => {
      promiseResolve && promiseResolve(ok);
    },
    [promiseResolve],
  );

  useEffect(() => {
    // if (typeof globalAlert === 'function') throw new Error('Only one Alert.Global can be initialized');
    globalAlert = handleShow;
  }, [handleShow]);

  return (
    <Alert
      opened={opened}
      message={params?.message}
      title={params?.title}
      confirmation={params?.confirmation}
      onClose={onClose}
    />
  );
};

export const showGlobalAlert = async (params: IAlertShowParams): Promise<boolean> => {
  //eslint-disable-next-line
  if (!globalAlert) throw new Error('Please, initialize an Alert.Global before');

  //prevent an alert to overhide another
  return (lastPromise = lastPromise.then(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 300));
    return globalAlert(params);
  }));
};

export default memo(AlertGlobalProvider);
