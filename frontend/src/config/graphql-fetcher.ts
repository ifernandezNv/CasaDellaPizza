import axios from 'axios';

const fetcher = <TData, TVariables>(
  query: string, 
  variables?: TVariables, 
): (() => Promise<TData>) => {
  return async () => {
    const res = await axios.request({
      url: import.meta.env.VITE_API_URL,
      method: "POST",
      data: {
        query,
        variables,
      },
    });

    const json = res.data;
    if (json.errors) {
      const { message } = json.errors[0] || "Error..";
      throw new Error(message);
    }
    return json.data;
  };
};
export default fetcher