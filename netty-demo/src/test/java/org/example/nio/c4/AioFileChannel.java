package org.example.nio.c4;

import lombok.extern.slf4j.Slf4j;
import org.example.nio.c1.ByteBufferUtil;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.AsynchronousFileChannel;
import java.nio.channels.CompletionHandler;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

@Slf4j
public class AioFileChannel {
    public static void main(String[] args) throws IOException {
        // 线程切换时，会进行finally调用close方法，try with resources 本质就是前者语法糖
        AsynchronousFileChannel channel = null;
        try {
            // 参数1 ByteBuffer
            // 参数2 读取的起始位置
            // 参数3 附件
            // 参数4 回调对象 CompletionHandler
            channel = AsynchronousFileChannel.open(Paths.get("word.txt"), StandardOpenOption.READ);
            ByteBuffer buffer = ByteBuffer.allocate(16);
            log.debug("read begin...");
            channel.read(buffer, 0, buffer, new CompletionHandler<Integer, ByteBuffer>() {
                @Override // read 成功
                public void completed(Integer result, ByteBuffer attachment) {
                    log.debug("read completed...{}", result);
                    attachment.flip();
                    ByteBufferUtil.debugAll(attachment);
                }
                @Override // read 失败
                public void failed(Throwable exc, ByteBuffer attachment) {
                    exc.printStackTrace();
                }
            });
            log.debug("read end...");
        } catch (IOException e) {
            System.out.println(e);
            e.printStackTrace();
        }finally {
            System.in.read();
            System.out.println("close");
            if(channel != null){
                channel.close();
            }
        }
        System.in.read();
    }
}
