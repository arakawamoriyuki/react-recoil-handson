# React hooksとは

- React Hooksは、React16.8.0以降で利用可能な関数コンポーネントのAPI
- コンポーネント間のロジックを再利用できる
- UIとロジックを分けることができる
- 主流となった 関数コンポーネント + hooks が対象

[フック API リファレンス](https://ja.reactjs.org/docs/hooks-reference.html)


# 目次

- `useState` 基本フック コンポーネントに閉じた状態(local state)を定義
- `useReducer` useStateの代替。値をセットするのではなく値をどういう操作をするかを定義
- `useEffect` 基本フック コンポーネントのライフサイクルを定義
- `memo` コンポーネントをメモ化(キャッシュ)し、不要なレンダリングを抑制
- `useMemo` 関数の戻り値をメモ化(キャッシュ)し、不要な再実行を抑制
- `useCallback` 関数をメモ化(キャッシュ)し、メモ化されたコンポーネントの不要なレンダリングを抑制
- `custom hook` local stateのロジックをコンポーネントから分離し、テスト可能にした例
- `context` Reactのcontext apiを利用したglobal stateの定義
- `context optimize` Reactのcontext apiを利用したglobal stateのレンダリング最適化した例
- `recoil` 状態管理ライブラリrecoilを利用したglobal stateの利用例
- `recoil optimize` 状態管理ライブラリrecoilを利用したglobal stateのレンダリング最適化した例
- `recoil custom hook` global stateのロジックをコンポーネントから分離し、テスト可能にした例


# 目的に応じた索引

- 基本hookについて
  - useState
  - useEffect
  - context
- 状態管理について
  - useState
  - context
  - recoil
- レンダリング最適化について
  - memo
  - useMemo
  - useCallback
  - context optimize
  - recoil optimize
- ロジック分離とテスト
  - useReducer
  - custom hook
  - recoil custom hook


# useState

基本フック コンポーネントに閉じた状態(local state)を定義

/src/components/UseState.tsx

```jsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const UseStateComponent: React.FC = () => {
  const [count, setCount] = React.useState(0);

  console.log('UseStateComponent render');

  return (
    <Box>
      <Typography>Count: {count}</Typography>
      <Button onClick={() => setCount(0)}>Reset</Button>
      <Button onClick={() => setCount(prevCount => prevCount + 1)}>+</Button>
    </Box>
  );
};

export default UseStateComponent;
```

/src/App.tsx

```diff
...
+ import UseState from './components/UseState';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      ...
+     <Route path="/use-state" element={<UseState />} />
      ...
    </Routes>
  </BrowserRouter>
);
```

- useStateによりコンポーネントの状態が作られる
- 戻り値の値とそのセッターを利用して表示や状態の変更ができる
- 状態の変更を検知して再レンダリングされる


# useReducer

useStateの代替。値をセットするのではなく値をどういう操作をするかを定義

/src/components/UseReducer.tsx

```jsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const reducer = (count: number, action: string)=> {
  switch (action){
    case 'increment':
      return count + 1
    case 'reset':
      return 0
    default:
      return count
  }
};

const UseReducerComponent: React.FC = () => {
  const [count, dispatch] = React.useReducer(reducer, 0)

  return (
    <Box>
      <Typography>Count: {count}</Typography>
      <Button onClick={() => dispatch('reset')}>Reset</Button>
      <Button onClick={() => dispatch('increment')}>+</Button>
    </Box>
  );
};

export default UseReducerComponent;
```

/src/App.tsx

```diff
...
+ import UseReducer from './components/UseReducer';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      ...
+     <Route path="/use-reducer" element={<UseReducer />} />
      ...
    </Routes>
  </BrowserRouter>
);
```

- useReducerによりコンポーネントの状態が作られる
- 戻り値の値とその変更関数を利用して表示や状態の変更ができる
- useStateとは違い `値をセットする` のではなく `値にどういう操作をする` かを定義する
- reducerが純粋な関数なのでロジックをコンポーネントから剥がしやすくテストしやすい
- ただし、useStateを使ったcustom hookを作成することで同様のメリットは得られる


# useEffect

基本フック コンポーネントのライフサイクルを定義

/src/components/UseEffect.tsx

```jsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const UseEffectComponent: React.FC = () => {
  const [count, setCount] = React.useState(0);

  console.log('UseEffectComponent render');

  React.useEffect(() => {
    console.log('UseEffectComponent mount');

    return (() => {
      console.log('UseEffectComponent unmount');
    });
  }, []);

  React.useEffect(() => {
    console.log('UseEffectComponent change count');
  }, [count]);

  return (
    <Box>
      <Typography>Count: {count}</Typography>
      <Button onClick={() => setCount(0)}>Reset</Button>
      <Button onClick={() => setCount(prevCount => prevCount + 1)}>+</Button>
    </Box>
  );
};

export default UseEffectComponent;
```

/src/App.tsx

```diff
...
+ import UseEffect from './components/UseEffect';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      ...
+     <Route path="/use-effect" element={<UseEffect />} />
      ...
    </Routes>
  </BrowserRouter>
);
```

- useEffectによりコンポーネントのライフサイクルを定義できる
- mountされた時、APIリクエストしてデータを取ってくるなどの前処理
- unmountされた時、websocketの接続を切るなどの後処理
- 第二引数に指定された値(状態でもpropsでも)が変更された時、データを再度取ってくるなどの変更処理


# memo

コンポーネントをメモ化(キャッシュ)し、不要なレンダリングを抑制

/src/components/Memo.tsx

```jsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface CountComponentProps {
  count: number;
}

const CountComponent: React.FC<CountComponentProps> = ({ count }) => {

  console.log('CountComponent render');

  return (
    <Typography>Count: {count}</Typography>
  );
};

const MemorizeCountComponent: React.FC<CountComponentProps> = React.memo(({ count }) => {

  console.log('MemorizeCountComponent render');

  return (
    <Typography>Count: {count}</Typography>
  );
});

const MemoComponent: React.FC = () => {
  const [count1, setCount1] = React.useState(0);
  const [count2, setCount2] = React.useState(0);

  console.log('MemoComponent render');

  return (
    <Box>
      <CountComponent count={count1} />
      <Button onClick={() => setCount1(0)}>Reset</Button>
      <Button onClick={() => setCount1(prevCount => prevCount + 1)}>+</Button>

      <MemorizeCountComponent count={count2} />
      <Button onClick={() => setCount2(0)}>Reset</Button>
      <Button onClick={() => setCount2(prevCount => prevCount + 1)}>+</Button>
    </Box>
  );
};

export default MemoComponent;
```

/src/App.tsx

```diff
...
+ import Memo from './components/Memo';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      ...
+     <Route path="/memo" element={<Memo />} />
      ...
    </Routes>
  </BrowserRouter>
);
```

- memoによりコンポーネントをメモ化(キャッシュ)し、不要なレンダリングを抑制できる
- メモ化されていないコンポーネントは親のレンダリング時、渡された値の変化にかかわらず再レンダリングされる
- メモ化されたコンポーネントは渡された値が変化しない限りレンダリングされない


# useMemo

関数の戻り値をメモ化(キャッシュ)し、不要な再実行を抑制

/src/components/UseMemo.tsx

```jsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const UseMemoComponent: React.FC = () => {
  const [count1, setCount1] = React.useState(0);
  const [count2, setCount2] = React.useState(0);

  const double = (value: number) => {

    console.log('calculate double');

    return value * 2;
  };

  const doubleCount1 = React.useMemo(() => double(count1), [count1]);
  const doubleCount2 = double(count2);

  return (
    <Box>
      <Typography>Count: {doubleCount1}</Typography>
      <Button onClick={() => setCount1(0)}>Reset</Button>
      <Button onClick={() => setCount1(prevCount => prevCount + 1)}>+</Button>

      <Typography>Count: {doubleCount2}</Typography>
      <Button onClick={() => setCount2(0)}>Reset</Button>
      <Button onClick={() => setCount2(prevCount => prevCount + 1)}>+</Button>
    </Box>
  );
};

export default UseMemoComponent;
```

/src/App.tsx

```diff
...
+ import UseMemo from './components/UseMemo';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      ...
+     <Route path="/use-memo" element={<UseMemo />} />
      ...
    </Routes>
  </BrowserRouter>
);
```

- useMemoにより関数の戻り値をメモ化(キャッシュ)し、不要な再実行を抑制できる
- メモ化されていない関数の戻り値は親のレンダリング時、利用している値の変化にかかわらず再実行される
- メモ化された関数の戻り値は、利用している値が変化しない限り再実行されない


# useCallback

関数をメモ化(キャッシュ)し、メモ化されたコンポーネントの不要なレンダリングを抑制

/src/components/UseCallback.tsx

```jsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface LogButtonComponentProps {
  onClick: () => void;
}

const LogButtonComponent: React.FC<LogButtonComponentProps> = ({ onClick }) => {

  console.log('LogButtonComponent render');

  return (
    <Button onClick={onClick}>log</Button>
  );
};

const MemorizeLogButtonComponent: React.FC<LogButtonComponentProps> = React.memo(({ onClick }) => {

  console.log('MemorizeLogButtonComponent render');

  return (
    <Button onClick={onClick}>memorize log</Button>
  );
});

const UseCallbackComponent: React.FC = () => {
  const [count1, setCount1] = React.useState(0);
  const [count2, setCount2] = React.useState(0);

  const handleClick = React.useCallback(() => {
    console.log(`count: ${count1}`);
  }, [count1]);

  return (
    <Box>
      <Typography>Count: {count1}</Typography>
      <Button onClick={() => setCount1(prevCount => prevCount + 1)}>+</Button>
      <LogButtonComponent onClick={handleClick} />
      <MemorizeLogButtonComponent onClick={handleClick} />

      <Typography>Count: {count2}</Typography>
      <Button onClick={() => setCount2(prevCount => prevCount + 1)}>+</Button>
    </Box>
  );
};

export default UseCallbackComponent;
```

/src/App.tsx

```diff
...
+ import UseCallback from './components/UseCallback';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      ...
+     <Route path="/use-callback" element={<UseCallback />} />
      ...
    </Routes>
  </BrowserRouter>
);
```

- useCallbackにより関数をメモ化(キャッシュ)し、メモ化されたコンポーネントの不要なレンダリングを抑制できる
- 基本的に関数はレンダリング時に再作成され、以前の関数と違う関数(等価ではない)を渡すことになるので、メモ化されているコンポーネントに渡しているかに関わらず再レンダリングされる
- useCallbackを通すことにより、前回と同じ(等価な)関数を作ることができる
- ただし、useCallbackで作成した関数でもメモ化されていないコンポーネントに渡す場合は再レンダリングされる
- useCallbackで作成した関数をメモ化されたコンポーネントに渡すことで再レンダリングを抑制できる


# custom hook

local stateのロジックをコンポーネントから分離し、テスト可能にした例

/src/components/CustomHookStore.tsx

```jsx
import React from 'react';

export const useCounter = (initialCount = 0) => {
  const [count, setCount] = React.useState(initialCount);

  const increment = () => {
    setCount((count) => count + 1);
  };

  const reset = () => {
    setCount(0);
  };

  return { count, increment, reset };
}
```

/src/components/CustomHook.tsx

```jsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useCounter } from './CustomHookStore';

const CustomHookComponent: React.FC = () => {
  const { count, increment, reset } = useCounter(0);

  return (
    <Box>
      <Typography>Count: {count}</Typography>
      <Button onClick={() => increment()}>+</Button>
      <Button onClick={() => reset()}>Reset</Button>
    </Box>
  );
};

export default CustomHookComponent;
```

/src/App.tsx

```diff
...
+ import CustomHook from './components/CustomHook';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      ...
+     <Route path="/custom-hook" element={<CustomHook />} />
      ...
    </Routes>
  </BrowserRouter>
);
```

- カスタムフックを定義することにより、ロジックをコンポーネントから分離できる

## テスト

/src/components/CustomHook.test.tsx

```tsx
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import CustomHook from './CustomHook';
import * as CustomHookStoreModule from './CustomHookStore';

afterEach(() => cleanup());

describe('CustomHook', () => {
  it('CustomHookが表示される', () => {
    const { asFragment } = render(
      <CustomHook />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('+ボタンが押されるとincrementが呼ばれる', () => {
    const mockIncrement = jest.fn();
    jest.spyOn(CustomHookStoreModule, 'useCounter').mockReturnValueOnce({
      count: 1,
      increment: mockIncrement,
      reset: () => {},
    });

    render(
      <CustomHook />,
    );

    const button = screen.getByRole('button', { name: '+' });
    fireEvent.click(button);

    expect(mockIncrement).toBeCalled();
  });

  it('Resetボタンが押されるとresetが呼ばれる', () => {
    const mockReset = jest.fn();
    jest.spyOn(CustomHookStoreModule, 'useCounter').mockReturnValueOnce({
      count: 1,
      increment: () => {},
      reset: mockReset,
    });

    render(
      <CustomHook />,
    );

    const button = screen.getByRole('button', { name: 'Reset' });
    fireEvent.click(button);

    expect(mockReset).toBeCalled();
  });
});
```

/src/components/CustomHookStore.test.tsx

```tsx
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './CustomHookStore';

describe('useCounter', () => {
  describe('count', () => {
    it('現在のcount値を返す', () => {
      const { result } = renderHook(() => useCounter(0));
      expect(result.current.count).toBe(0);
    });
  });

  describe('increment', () => {
    it('countを +1 する', () => {
      const { result } = renderHook(() => useCounter(0));
      act(() => { result.current.increment() });
      expect(result.current.count).toBe(1);
    });
  });

  describe('reset', () => {
    it('countを 0 にする', () => {
      const { result } = renderHook(() => useCounter(2));
      act(() => { result.current.reset() });
      expect(result.current.count).toBe(0);
    });
  });
});
```

- ロジックをコンポーネントから分離したので見通しが良く、それぞれの役割についてテストできるようになる
- コンポーネントはスナップショットテストによる見た目の変化と、イベントの動作(xxxを呼び出すなど)のみテスト。ロジックについてはテストしなくていい
- ロジック(カスタムフック)はその処理単体をテスト


# context

Reactのcontext apiを利用したglobal stateの定義

/src/Context.tsx

```jsx
import React from 'react';

interface CountState {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const CountContext = React.createContext<CountState>({
  count: 0,
  setCount: () => undefined,
});

interface CountProviderProps {
  children: React.ReactNode;
}

export const CountProvider: React.FC<CountProviderProps> = ({ children }) => {
  const [count, setCount] = React.useState<number>(0);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
};

export const useCountValue = () => React.useContext(CountContext).count;
export const useCountSetValue = () => React.useContext(CountContext).setCount;
```

/src/components/Context.tsx

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useCountValue, useCountSetValue } from '../Context';

const CountComponent: React.FC = () => {
  const count = useCountValue();

  console.log('CountComponent render');

  return (
    <Typography>Count: {count}</Typography>
  );
};

const CountResetComponent: React.FC = () => {
  const setCount = useCountSetValue();

  console.log('ResetComponent render');

  return (
    <Button onClick={() => setCount(0)}>Reset</Button>
  );
};

const CountUpComponent: React.FC = () => {
  const setCount = useCountSetValue();

  console.log('CountUpComponent render');

  return (
    <Button onClick={() => setCount(prevCount => prevCount + 1)}>+</Button>
  );
};

const ContextComponent: React.FC = () => {
  const navigate = useNavigate();

  console.log('ContextComponent render');

  return (
    <Box>
      <CountComponent />
      <CountResetComponent />
      <CountUpComponent />
      <Button onClick={() => navigate('/use-state')}>go /use-state</Button>
    </Box>
  );
};

export default ContextComponent;
```

/src/App.tsx

```diff
+ import { CountProvider } from './Context';
+ import Context from './components/Context';

+ interface ProvidersProps {
+   children: React.ReactNode;
+ }

+ export const Providers: React.FC<ProvidersProps> = ({ children }) => {
+   return (
+     <CountProvider>
+       {children}
+     </CountProvider>
+   );
+ };

const App: FC = () => (
- <BrowserRouter>
-   <Routes>
-     ...
-   </Routes>
- </BrowserRouter>
+ <Providers>
+   <BrowserRouter>
+     <Routes>
+       ...
+       <Route path="/context" element={<Context />} />
+       ...
+     </Routes>
+   </BrowserRouter>
+ </Providers>
);

export default App;
```

- 全スコープで利用可能な状態を作ることができ、ログインユーザー情報など多数のコンポーネントで利用することができる
- local stateとgrobal stateについて
  - useStateで作っていた状態はlocal state
    - コンポーネントに閉じた状態で、unmountされると消える
  - contextで作る状態はgrobal state
    - 全スコープで利用可能な状態で、リロードされるまで消えない
- createContextで作ったコンテキスト(grobal state)を作り、それを利用するカスタムフックを作る
  - コンテキストは配下の子で利用可能。これにより構造的に離れたコンポーネントへのpropsバケツリレーがなくなる
  - コンテキストはRouterの親なので、全てのページ、全てのコンポーネントで利用可能なgrobal stateになる
- どこからでもアクセスできるグローバルな状態はなるべく必要最低限に止める


# context optimize

Reactのcontext apiを利用したglobal stateのレンダリング最適化した例

/src/ContextOptimize.tsx

```jsx
import React from 'react';

const CountContext = React.createContext<number>(0);
const SetCountContext = React.createContext<React.Dispatch<React.SetStateAction<number>>>(
  () => undefined
);

interface CountProviderProps {
  children: React.ReactNode;
}

export const CountOptimizeProvider: React.FC<CountProviderProps> = ({ children }) => {
  const [count, setCount] = React.useState<number>(0);

  return (
    <CountContext.Provider value={count}>
      <SetCountContext.Provider value={setCount}>
        {children}
      </SetCountContext.Provider>
    </CountContext.Provider>
  );
};

export const useCountValue = () => React.useContext(CountContext);
export const useCountSetValue = () => React.useContext(SetCountContext);
```

/src/components/ContextOptimize.tsx

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useCountValue, useCountSetValue } from '../ContextOptimize';

const CountComponent: React.FC = () => {
  const count = useCountValue();

  console.log('CountComponent render');

  return (
    <Typography>Count: {count}</Typography>
  );
};

const CountResetComponent: React.FC = () => {
  const setCount = useCountSetValue();

  console.log('ResetComponent render');

  return (
    <Button onClick={() => setCount(0)}>Reset</Button>
  );
};

const CountUpComponent: React.FC = () => {
  const setCount = useCountSetValue();

  console.log('CountUpComponent render');

  return (
    <Button onClick={() => setCount(prevCount => prevCount + 1)}>+</Button>
  );
};

const ContextOptimizeComponent: React.FC = () => {
  const navigate = useNavigate();

  console.log('ContextOptimizeComponent render');

  return (
    <Box>
      <CountComponent />
      <CountResetComponent />
      <CountUpComponent />
      <Button onClick={() => navigate('/use-state')}>go /use-state</Button>
    </Box>
  );
};

export default ContextOptimizeComponent;
```

/src/App.tsx

```diff
+ import { CountOptimizeProvider } from './ContextOptimize';
+ import ContextOptimize from './components/ContextOptimize';

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
-   <CountProvider>
-     {children}
-   </CountProvider>
+   <CountProvider>
+     <CountOptimizeProvider>
+      {children}
+     </CountOptimizeProvider>
+   </CountProvider>
  );
};

const App: FC = () => (
  <Providers>
    <BrowserRouter>
      <Routes>
        ...
+       <Route path="/context-optimize" element={<ContextOptimize />} />
        ...
      </Routes>
    </BrowserRouter>
  </Providers>
);

export default App;
```

- contextの例にはレンダリング最適化の面で問題
  - +ボタンを押した際、値を利用しているCountComponent以外にもセッターを利用しているResetComponentやCountUpComponentも再レンダリングされる
  - 値とセッター含め同一のcontextが作られているため、値だけが変化した場合もセッター利用側が無駄に再レンダリングされる
- 値とセッターを別々のcontextで定義する必要がある
  - +ボタンを押した際、値を利用しているCountComponentのみ再レンダリングされ、セッター利用してるResetComponentやCountUpComponentはレンダリングされない


# recoil

状態管理ライブラリrecoilを利用したglobal stateの利用例

/src/components/Recoil.tsx

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { atom, useRecoilState } from 'recoil';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const state = atom<number>({
  key: 'count',
  default: 0,
});

const useCounter = () => {
  const [count, setCount] = useRecoilState(state);

  const increment = () => {
    setCount((count) => count + 1);
  };

  const reset = () => {
    setCount(0);
  };

  return { count, increment, reset };
};

const CountComponent: React.FC = () => {
  const { count } = useCounter();

  console.log('CountComponent render');

  return (
    <Typography>Count: {count}</Typography>
  );
};

const CountResetComponent: React.FC = () => {
  const { reset } = useCounter();

  console.log('ResetComponent render');

  return (
    <Button onClick={() => reset()}>Reset</Button>
  );
};

const CountUpComponent: React.FC = () => {
  const { increment } = useCounter();

  console.log('CountUpComponent render');

  return (
    <Button onClick={() => increment()}>+</Button>
  );
};

const RecoilComponent: React.FC = () => {
  const navigate = useNavigate();

  console.log('RecoilComponent render');

  return (
    <Box>
      <CountComponent />
      <CountResetComponent />
      <CountUpComponent />
      <Button onClick={() => navigate('/use-state')}>go /use-state</Button>
    </Box>
  );
};

export default RecoilComponent;
```

/src/App.tsx

```diff
+ import { RecoilRoot } from 'recoil';
+ import Recoil from './components/Recoil';

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
-   <CountProvider>
-     <CountOptimizeProvider>
-      {children}
-     </CountOptimizeProvider>
-   </CountProvider>
+   <CountProvider>
+     <CountOptimizeProvider>
+       <RecoilRoot>
+         {children}
+       </RecoilRoot>
+     </CountOptimizeProvider>
+   </CountProvider>
  );
};

const App: FC = () => (
  <Providers>
    <BrowserRouter>
      <Routes>
        ...
+       <Route path="/recoil" element={<Recoil />} />
        ...
      </Routes>
    </BrowserRouter>
  </Providers>
);

export default App;
```

- recoilを使うとRecoilRootで囲むだけで、context apiのようにgrobal stateや値とセッター毎にProviderを用意する必要がなくなる
- atomの定義とuseStateライクなuseRecoilStateを使ってgrobal stateを定義可能


# recoil optimize

状態管理ライブラリrecoilを利用したglobal stateのレンダリング最適化した例

/src/components/RecoilOptimize.tsx

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const state = atom<number>({
  key: 'count-optimize',
  default: 0,
});

const useCount = () => useRecoilValue(state);
const useSetCount = () => useSetRecoilState(state);

const CountComponent: React.FC = () => {
  const count = useCount();

  console.log('CountComponent render');

  return (
    <Typography>Count: {count}</Typography>
  );
};

const CountResetComponent: React.FC = () => {
  const setCount = useSetCount();

  console.log('ResetComponent render');

  return (
    <Button onClick={() => setCount(0)}>Reset</Button>
  );
};

const CountUpComponent: React.FC = () => {
  const setCount = useSetCount();

  console.log('CountUpComponent render');

  return (
    <Button onClick={() => setCount(prevCount => prevCount + 1)}>+</Button>
  );
};

const RecoilOptimizeComponent: React.FC = () => {
  const navigate = useNavigate();

  console.log('RecoilOptimizeComponent render');

  return (
    <Box>
      <CountComponent />
      <CountResetComponent />
      <CountUpComponent />
      <Button onClick={() => navigate('/use-state')}>go /use-state</Button>
    </Box>
  );
};

export default RecoilOptimizeComponent;
```

/src/App.tsx

```diff
+ import RecoilOptimize from './components/RecoilOptimize';

const App: FC = () => (
  <Providers>
    <BrowserRouter>
      <Routes>
        ...
+       <Route path="/recoil-optimize" element={<RecoilOptimize />} />
        ...
      </Routes>
    </BrowserRouter>
  </Providers>
);

export default App;
```

- recoilの例ではcontextの例と同様レンダリング最適化の面で問題
  - +ボタンを押した際、値を利用しているCountComponent以外にもセッターを利用しているResetComponentやCountUpComponentも再レンダリングされる
  - 値とセッター含め同一のcontextが作られているため、値だけが変化した場合もセッター利用側が無駄に再レンダリングされる
- useRecoilStateの代わりに値を利用するuseRecoilValueやセッターを利用するuseSetRecoilStateを別々に定義する必要がある
  - +ボタンを押した際、値を利用しているCountComponentのみ再レンダリングされ、セッター利用してるResetComponentやCountUpComponentはレンダリングされない


# recoil custom hook

global stateのロジックをコンポーネントから分離し、テスト可能にした例

/src/components/RecoilCustomHookStore.tsx

```jsx
import React from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

// カプセル化のために通常exportしない
// renderRecoilHookを利用した初期状態付きのテストをする場合はexport
export const state = atom<number>({
  key: 'count-test',
  default: 0,
});

export const useCount = () => useRecoilValue(state);

export const useIncrement = () => {
  const setCount = useSetRecoilState(state);

  return React.useCallback(
    () => {
      setCount((count) => count + 1);
    },
    [setCount],
  );
};

export const useReset = () => {
  const setCount = useSetRecoilState(state);

  return React.useCallback(
    () => {
      setCount(0);
    },
    [setCount],
  );
};
```

/src/components/RecoilCustomHook.tsx

```jsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useCount, useReset, useIncrement } from './RecoilCustomHookStore';

const CountComponent: React.FC = () => {
  const count = useCount();

  console.log('CountComponent render');

  return (
    <Typography>Count: {count}</Typography>
  );
};

const CountResetComponent: React.FC = () => {
  const reset = useReset();

  console.log('ResetComponent render');

  return (
    <Button onClick={() => reset()}>Reset</Button>
  );
};

const CountUpComponent: React.FC = () => {
  const increment = useIncrement();

  console.log('CountUpComponent render');

  return (
    <Button onClick={() => increment()}>+</Button>
  );
};

const RecoilCustomHookComponent: React.FC = () => {
  return (
    <Box>
      <CountComponent />
      <CountResetComponent />
      <CountUpComponent />
    </Box>
  );
};

export default RecoilCustomHookComponent;
```

/src/App.tsx

```diff
+ import RecoilCustomHook from './components/RecoilCustomHook';

const App: FC = () => (
  <Providers>
    <BrowserRouter>
      <Routes>
        ...
+       <Route path="/recoil-custom-hook" element={<RecoilCustomHook />} />
        ...
      </Routes>
    </BrowserRouter>
  </Providers>
);

export default App;
```

- カスタムフックを定義することにより、ロジックをコンポーネントから分離できる

## テスト

/src/components/RecoilCustomHook.test.tsx

```tsx
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import RecoilCustomHook from './RecoilCustomHook';
import * as RecoilCustomHookStoreModule from './RecoilCustomHookStore';

afterEach(() => cleanup());

describe('RecoilCustomHook', () => {
  it('RecoilCustomHookが表示される', () => {
    const { asFragment } = render(
      <RecoilRoot>
        <RecoilCustomHook />
      </RecoilRoot>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('+ボタンが押されるとincrementが呼ばれる', () => {
    const mockIncrement = jest.fn();
    jest.spyOn(RecoilCustomHookStoreModule, 'useIncrement').mockReturnValueOnce(mockIncrement);

    render(
      <RecoilRoot>
        <RecoilCustomHook />
      </RecoilRoot>,
    );

    const button = screen.getByRole('button', { name: '+' });
    fireEvent.click(button);

    expect(mockIncrement).toBeCalled();
  });

  it('Resetボタンが押されるとresetが呼ばれる', () => {
    const mockReset = jest.fn();
    jest.spyOn(RecoilCustomHookStoreModule, 'useReset').mockReturnValueOnce(mockReset);

    render(
      <RecoilRoot>
        <RecoilCustomHook />
      </RecoilRoot>,
    );

    const button = screen.getByRole('button', { name: 'Reset' });
    fireEvent.click(button);

    expect(mockReset).toBeCalled();
  });
});
```

/src/components/RecoilCustomHookStore.test.tsx

```tsx
import { renderRecoilHook, act } from 'react-recoil-hooks-testing-library';
import { state, useCount, useReset, useIncrement } from './RecoilCustomHookStore';

describe('useCount', () => {
  it('現在のcount値を返す', () => {
    const { result } = renderRecoilHook(useCount);
    expect(result.current).toBe(0);
  });
});

describe('useIncrement', () => {
  it('countを +1 する', () => {
    const { result } = renderRecoilHook(() => {
      const count = useCount();
      const increment = useIncrement();
      return { count, increment };
    });
    act(() => { result.current.increment() });
    expect(result.current.count).toBe(1);
  });
});

describe('useReset', () => {
  it('countを 0 にする', () => {
    const { result } = renderRecoilHook(() => {
      const count = useCount();
      const reset = useReset();
      return { count, reset };
    }, {
      states: [{ recoilState: state, initialValue: 1 }],
    });
    expect(result.current.count).toBe(1);
    act(() => { result.current.reset() });
    expect(result.current.count).toBe(0);
  });
});
```

- ロジックをコンポーネントから分離したので見通しが良く、それぞれの役割についてテストできるようになる
- コンポーネントはスナップショットテストによる見た目の変化と、イベントの動作(xxxを呼び出すなど)のみテスト。ロジックについてはテストしなくていい
- ロジック(カスタムフック)はその処理単体をテスト
- 注意: カプセル化のため通常atomで作ったstateはexportしない
  - initialValueを設定可能なテストの利便性とstateを別で利用される危険性は表裏一体なので要検討
