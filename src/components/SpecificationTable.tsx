type Props = {
  specifications: any[];
};

const SpecificationTable = ({
  specifications
}: Props) => {

  return (
    <div className="spec-card">

      <div className="spec-header">
        Specifications
      </div>

      <table>

        <tbody>

          {specifications.map(spec => (
            <tr key={spec.id}>

              <td className="spec-key">
                {spec.key}
              </td>

              <td>
                {spec.value}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default SpecificationTable;