import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useMeQuery } from "../../graphql/generated/graphql"
import { ssrGetProducts } from "../../graphql/generated/pagePublic"
import { withApollo } from "../../lib/withApollo"

function Home({ data }) {
  const { user } = useUser()
  const { data: me } = useMeQuery()
  // const { data, loading, error } = useGetProductsQuery()

  return (
    <div>
      <h1>Hello World</h1>
      <pre>
        {/* {JSON.stringify(data.products, null, 2)} */}
        ok: {JSON.stringify(me, null, 2)}
      </pre>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    return {
      props: {}
    }
  }
})

export default withApollo(
  ssrGetProducts.withPage()(Home)
);