using System.Collections;
using System.IO;
using CsvHelper;

namespace rowinpt.api.Services
{
    public class CsvWriterService : ICsvWriter
    {
        public byte[] WriteRecords(IEnumerable records)
        {
            using (var memoryStream = new MemoryStream())
            {
                using (var streamWriter = new StreamWriter(memoryStream))
                {
                    using (var csvWriter = new CsvWriter(streamWriter))
                    {
                        streamWriter.WriteLine("sep=,");
                        csvWriter.WriteRecords(records);
                        
                        csvWriter.Flush();
                    }
                }
                return memoryStream.ToArray();
            }
        }
    }
}
