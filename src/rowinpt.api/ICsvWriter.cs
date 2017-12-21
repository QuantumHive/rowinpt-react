using System.Collections;

namespace rowinpt.api
{
    public interface ICsvWriter
    {
        byte[] WriteRecords(IEnumerable records);
    }
}
