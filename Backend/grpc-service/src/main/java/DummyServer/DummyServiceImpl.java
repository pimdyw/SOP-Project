package DummyServer;

import com.proto.greet.*;
import com.proto.greet.DummyServiceGrpc;
import io.grpc.stub.*;

public class DummyServiceImpl extends DummyServiceGrpc.DummyServiceImplBase {
    @Override
    public void sayHi(DummyMessage request, StreamObserver<DummyMessage> responseObserver) {
        String txt = request.getTxt();


        String result = txt;
        DummyMessage response = DummyMessage.newBuilder().setTxt(result).build();
        responseObserver.onNext(response);
// Block 4: complete the RPC call
        responseObserver.onCompleted();
    }
}
